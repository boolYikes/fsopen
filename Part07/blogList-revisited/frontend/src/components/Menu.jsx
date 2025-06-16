import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import LoginForm from './LoginForm'
import SessionTimer from './SessionTimer'
import Button from './Button'
import './Menu.css'

const Menu = ({ sessionInfo }) => {
  const dispatch = useDispatch()

  return (
    <div className="menu-bar">
      <Link href="#" to="/" className="menu-bar-item">
        Blogs
      </Link>
      <Link href="#" to="/users" className="menu-bar-item">
        Users
      </Link>

      {!sessionInfo ? (
        <LoginForm />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '4px',
          }}
        >
          <span style={{ marginRight: '4px' }}>
            Hi, {sessionInfo.name}! Enjoy your doomed session!
          </span>
          <Button onClick={() => dispatch(logout())} buttonLabel="logout" />
          <SessionTimer token={sessionInfo.token} />
        </div>
      )}
    </div>
  )
}

export default Menu
