import UpdateAuthor from './UpdateAuthor'

const Authors = ({ result, noti }) => {
  if (!result.data) {
    return <div>No authors to display</div>
  }
  if (result.loading) {
    return <div>...loading...</div>
  }

  return (
    <div style={{ display: 'flex' }}>
      <div className="authors-container" style={{ marginRight: '1rem' }}>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.books.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateAuthor noti={noti} authors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
