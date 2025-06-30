const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const Genre = require('./models/genre')

require('dotenv').config()
const MONGODB_URI = process.env.URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to DB')
  })
  .catch((e) => {
    console.log('error connecting to DB:', e.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Genre {
    name: String!
    books: [Book]
    id: ID!
  }

  type AuthUser {
    value: String!
    username: String!
    favoriteGenre: String
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]
    ): Book
    updateBirth(born: Int! author: String!): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): AuthUser
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks: [Book!]!
    allAuthors(born: YesNo): [Author!]!
    allGenres: [Genre]
    findBooksByGenre(id: String): Genre
    findBooks(author: String, genre: String): [Book]
    me: User
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book]
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [Genre]
  }

  enum YesNo {
    YES
    NO  
  }
`

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const pwHash = await bcrypt.hash(args.password, 16)
      let newUser
      if (args.favoriteGenre) {
        const existingGenre = await Genre.findOne({ name: args.favoriteGenre })
        if (existingGenre) {
          newUser = new User({
            username: args.username,
            password: pwHash,
            favoriteGenre: existingGenre._id,
          })
        } else {
          // if its a new genre
          const newGenre = new Genre({ name: args.favoriteGenre })
          await newGenre.save()
          newUser = new User({
            username: args.username,
            password: pwHash,
            favoriteGenre: newGenre._id,
          })
        }
      } else {
        newUser = new User({ username: args.username, password: pwHash })
      }

      return newUser.save().catch((e) => {
        throw new GraphQLError('User creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            e,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username }).populate(
        'favoriteGenre'
      )
      if (!user) {
        throw new GraphQLError('No such user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        })
      }
      const isAuth = await bcrypt.compare(args.password, user.password)
      if (!isAuth) {
        throw new GraphQLError('Wrong password', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.password,
          },
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {
        username: user.username,
        favoriteGenre: user.favoriteGenre?._id,
        value: jwt.sign(userForToken, process.env.SEKRET),
      }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('must log in', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      try {
        const book = await Book.findOne({ title: args.title }).populate(
          'author'
        )

        if (book && book.author.name == args.author) {
          throw new GraphQLError('The same book already exists', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          })
        }

        if (args.author.length < 3) {
          throw new GraphQLError('Author name too short. Must be >2 letters.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          })
        } else if (args.title.length < 3) {
          throw new GraphQLError('Book title too short. Must be >2 letters.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
            },
          })
        }

        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author, books: [] })
          await author.save()
        }

        const newBook = new Book({ ...args, author: author._id })

        const genresForNewBook = [] // map ignores await apparently...
        for (const genre of args.genres || []) {
          const genreFound = await Genre.findOne({ name: genre })
          if (genreFound) {
            genresForNewBook.push(genreFound._id)
            genreFound.books.push(newBook._id)
            await genreFound.save()
          } else {
            const newGenre = new Genre({ name: genre, books: [newBook._id] })
            genresForNewBook.push(newGenre._id)
            await newGenre.save()
          }
        }
        newBook.genres = genresForNewBook

        await newBook.save()

        author.books.push(newBook._id)
        await author.save()

        await newBook.populate('author')
        return newBook

        // other errors that are not explicitly handled
        // Although I think error handling should be done by a middleware? ...
      } catch (e) {
        throw new GraphQLError('Book-adding failed.', { extensions: { e } })
      }
    },
    updateBirth: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Must log in', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      try {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          author.born = args.born
          return await author.save()
        } else {
          throw new GraphQLError('No such author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          })
        }
      } catch (e) {
        throw new GraphQLError('Birth-date-update failed', {
          extensions: { e },
        })
      }
    },
  },
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allGenres: async () => {
      // return id and name
      const res = await Genre.find({}).select('name')
      return res
    },
    allBooks: async () => {
      // not used
      const res = await Book.find({}).populate('author')
      return res
    },
    allAuthors: async (root, args) => {
      if (!args.born) {
        const result = await Author.find({}).populate('books')
        return result
      }
      return await Author.find({ born: { $exists: args.born === 'YES' } })
    },
    findBooksByGenre: async (root, args) => {
      if (!args.id) {
        const res = await Book.find({}).populate('author')
        return { books: res, name: '', id: '' }
      }
      const genre = await Genre.findById(args.id).populate({
        path: 'books',
        populate: { path: 'author' },
      })
      return genre
    },
    findBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.genre && args.author) {
        const resultBooks = await Book.find({
          genres: { $in: [args.genre] },
          author: author._id,
        })
        const populatedBooks = await Book.populate(resultBooks, {
          path: 'author',
        })
        return populatedBooks
      } else if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).poplulate(
          'author'
        )
      } else if (args.author) {
        return await Book.find({ author: author._id }).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },
  },
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        born: root.author.born,
        id: root.id.toString(),
      }
    },
  },
  Author: {
    id: (root) => root.id.toString(),
  },
  Genre: {
    id: (root) => root.id.toString(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SEKRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser } // this is passed to the third param of all resolvers
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
