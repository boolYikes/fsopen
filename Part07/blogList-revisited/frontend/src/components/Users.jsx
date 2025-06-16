import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const dispatch = useDispatch()
  const totalBlogs = user.blogs.length
  return (
    <>
      <td>
        <Link to={`/users/${user.id}`} state={user}>
          {user.name}
        </Link>
      </td>
      <td>{totalBlogs}</td>
    </>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
  }
  const thStyle = {
    borderBottom: '1px solid black',
    padding: '4px',
    fontWeight: 'bold',
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <User user={user} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
}

export default Users
