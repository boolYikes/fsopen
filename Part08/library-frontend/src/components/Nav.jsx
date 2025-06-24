import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <nav
        style={{
          marginBottom: '1rem',
          textDecoration: 'none',
          border: '1px solid black',
        }}
      >
        <Link to="/">authors</Link> <Link to="/books">books</Link>{' '}
        <Link to="/add">add</Link>
      </nav>
    </div>
  )
}

export default Nav
