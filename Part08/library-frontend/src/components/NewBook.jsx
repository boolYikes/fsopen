import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_GENRES,
  FIND_BOOKS_BY_GENRE,
} from '../utils/queries'

const NewBook = ({ setError, filter }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    // refetch is network request, update is cache update. faster but less idempotent?
    refetchQueries: (mutResult) => {
      let refetchList = []
      for (const genre of mutResult.data.addBook.genres) {
        refetchList.push({
          query: FIND_BOOKS_BY_GENRE,
          variables: { id: genre },
        })
      }
      return [
        ...refetchList,
        {
          query: FIND_BOOKS_BY_GENRE, // for previously selected filter ux & rerender
          variables: filter ? { id: filter } : undefined,
        },
        { query: ALL_AUTHORS },
        { query: ALL_GENRES },
      ]
    },
    // update: (cache, { data: { addBook } }) => {
    //   const existingBooks = cache.readQuery({ query: ALL_BOOKS })
    //   if (existingBooks) {
    //     cache.writeQuery({
    //       query: ALL_BOOKS,
    //       data: {
    //         allBooks: [...existingBooks.allBooks, addBook],
    //       },
    //     })
    //   }

    //   const existingAuthors = cache.readQuery({ query: ALL_AUTHORS })
    //   if (
    //     existingAuthors &&
    //     !existingAuthors.allAuthors.find((a) => a.id === addBook.author.id)
    //   ) {
    //     cache.writeQuery({
    //       query: ALL_AUTHORS,
    //       data: {
    //         allAuthors: [...existingAuthors.allAuthors, addBook.author],
    //       },
    //     })
    //   }
    // },
    onError: (e) => {
      const messages = e.graphQLErrors.map((err) => err.message).join('\n')
      setError(messages)
    },
    onCompleted: (d) => {
      // name is confusing. it is not an error
      setError('Book added!')
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    const pub = Number(published)
    if (isNaN(pub)) {
      alert(
        'Published date must be a number that represents a year in format YYYY.',
      )
      return
    }

    await addBook({
      variables: { title, author, published: pub, genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre.trim()) {
      setGenres(genres.concat(genre.trim()))
      setGenre('')
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
