import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const payload = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }
    dispatch(login(payload)) // noti handled internally
  }
  return (
    <>
      <h2>You shall not pass!</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
