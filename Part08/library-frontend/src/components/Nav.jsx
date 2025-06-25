import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <nav
        style={{
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: 'skyblue',
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          authors
        </Link>{' '}
        <Link to="/books" style={{ textDecoration: 'none' }}>
          books
        </Link>{' '}
        <Link to="/add" style={{ textDecoration: 'none' }}>
          add
        </Link>
      </nav>
    </div>
  )
}

export default Nav
