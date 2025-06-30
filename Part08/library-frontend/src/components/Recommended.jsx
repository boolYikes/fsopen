// probably can reuse the Book component...

const Recommended = ({ result }) => {
  if (!result.data) {
    return <div>No books to display</div>
  }

  if (result.loading) {
    return <div>...loading...</div>
  }

  const info = result.data.findBooksByGenre

  return (
    <div>
      <h2>recommended for you</h2>
      <h3>based on your genre preference '{info.name}'</h3>
      <table style={{ textAlign: 'right' }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {info.books.map((a) => (
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

export default Recommended
