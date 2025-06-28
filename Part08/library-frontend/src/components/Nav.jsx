import { useApolloClient } from '@apollo/client'
import { Link } from 'react-router-dom'

const Nav = ({ token, setToken, setMessage }) => {
  const linkStyle = {
    textDecoration: 'none',
  }

  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setMessage('Bye!')
  }

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
        <Link to="/" style={linkStyle}>
          authors
        </Link>{' '}
        <Link to="/books" style={linkStyle}>
          books
        </Link>{' '}
        {token ? (
          <>
            <Link to="/add" style={linkStyle}>
              add
            </Link>
            <a style={linkStyle} href="#" onClick={handleLogout}>
              logout
            </a>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>
            login
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Nav
