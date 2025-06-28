import { useState, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../utils/queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ token, setToken, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {
      setMessage(e.graphQLErrors[0].message)
    },
    onCompleted: (d) => {
      setMessage("Welcome !! Have a good'un!")
      navigate('/')
    },
  })

  const client = useApolloClient()

  const navigate = useNavigate()

  const labelStyle = {
    textAlign: 'right',
  }

  useEffect(() => {
    if (result.data) {
      const tk = result.data.login.value
      setToken(tk)
      localStorage.setItem('library-user-token', tk)
    }
  }, [result.data])

  // Logged in view & Logout
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (token) {
    return (
      <div>
        <h2>You are already logged in</h2>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td style={labelStyle}>username:</td>
              <td>
                <input
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={labelStyle}>password:</td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">login</button>
        <button type="reset">cancel</button>
      </form>
      <button onClick={() => navigate('/signup')}>sign up</button>
    </div>
  )
}

export default LoginForm
