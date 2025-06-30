import { useState } from 'react'

const Filters = ({ result, setFilter, filter }) => {
  const [selected, setSelected] = useState('')

  if (!result.data) {
    return <div>Nothing to load...</div>
  }
  // Query all genres for dynamic filter buttons
  // buttons are react router links
  // that links to filter result view component
  // which queries and loads up books with appropriate genre

  if (result.loading) {
    return <div>...loading genres...</div>
  }

  const navStyle = {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: 'lightgreen',
    display: 'flex',
    gap: '1rem',
  }

  return (
    <div>
      <nav style={navStyle}>
        {result.data.allGenres.map((genre) => (
          <label key={genre.id}>
            <input
              type="radio"
              name="genre"
              checked={filter === genre.id}
              value={genre.id}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
            />
            {genre.name}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="genre"
            checked={!filter}
            value={undefined}
            onChange={(e) => {
              setFilter(e.target.value)
            }}
          />
          All books
        </label>
      </nav>
    </div>
  )
}

export default Filters
