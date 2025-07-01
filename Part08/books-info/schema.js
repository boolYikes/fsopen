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

  type Subscription {
    bookAdded: Book!
  }

  enum YesNo {
    YES
    NO  
  }
`

module.exports = typeDefs
