import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/queries'

const SignUp = ({ setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const navigate = useNavigate()

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (e) => {
      setMessage(e.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      setMessage(
        `Welcome aboard, ${data.createUser.username}! Go ahead and log in!`,
      )
    },
  })

  const labelStyle = {
    textAlign: 'right',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createUser({ variables: { username, password, favoriteGenre } })
    setUsername('')
    setPassword('')
    setFavoriteGenre('')
    navigate('/login')
  }

  return (
    <div>
      <h2>Sign up</h2>
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
            <tr>
              <td style={labelStyle}>favorite:</td>
              <td>
                <input
                  type="text"
                  value={favoriteGenre}
                  onChange={({ target }) => setFavoriteGenre(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">signup</button>
        <button type="reset">cancel</button>
      </form>
      <button onClick={() => navigate('/login')}>
        I already have an account
      </button>
    </div>
  )
}

export default SignUp
