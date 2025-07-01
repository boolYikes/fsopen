import { useSubscription } from '@apollo/client'
import { BOOK_ADDED, FIND_BOOKS_BY_GENRE } from '../utils/queries'
import { useState } from 'react'

const updateCache = (cache, query, addedBook) => {
  const uniqueByID = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let key = item.id
      return seen.has(key) ? false : seen.add(key)
    })
  }

  cache.updateQuery(query, ({ findBooksByGenre }) => {
    return {
      findBooksByGenre: {
        ...findBooksByGenre,
        books: uniqueByID(findBooksByGenre.books.concat(addedBook)),
      },
    }
  })
}

const Subscription = ({ token }) => {
  if (!token) {
    return <div>Log in to see the new books feed</div>
  }

  const maxLinesToShow = 10

  const [content, setContent] = useState([])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      // I already refetch from the add book mutation...
      updateCache(client.cache, { query: FIND_BOOKS_BY_GENRE }, addedBook)
      // client.cache.updateQuery({ query: FIND_BOOKS_BY_GENRE })

      // feed max line logic
      // It probably is more sensible to add timestamp from the mutation but for now ...
      const newContent = content.concat({
        author: addedBook.author.name,
        title: addedBook.title,
        genres: addedBook.genres?.map((genre) => genre.name).join(', '),
        id: addedBook.id,
        published: addedBook.published,
        time: new Date()
          .toLocaleString('en-CA', { hour12: false, timeZoneName: 'short' })
          .replace(',', ''),
      })
      if (newContent.length > maxLinesToShow) {
        newContent.shift()
      }
      setContent(newContent)
    },
  })

  return (
    <div>
      <h3>new books feed</h3>
      <table style={{ textAlign: 'right' }}>
        <tbody>
          <tr>
            <th>time</th>
            <th>title</th>
            <th>author</th>
            <th>genres</th>
            <th>published</th>
          </tr>
          {content &&
            content
              .slice()
              .reverse()
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.time}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.genres}</td>
                  <td>{item.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default Subscription
