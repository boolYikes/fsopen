const Books = ({ result }) => {
  if (!result.data) {
    return <div>No books to display</div>
  }

  if (result.loading) {
    return <div>...loading...</div>
  }

  const booksToShow = result.data.allBooks
    ? result.data.allBooks
    : result.data.findBooksByGenre.books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
