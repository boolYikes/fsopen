import { useState, useEffect } from 'react'
import Content from './components/Content'
import LoginForm from './components/Login'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) { // if the credential exists
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid credential given.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      const user = await logoutService.logout()
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(user.token)
      setUser(user)
      // window.localStorage.clear()
    } catch (exception) { // is this necessary?
      setErrorMessage('Something went wrong during logout.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  return (
    <div>
      <Message message={errorMessage}/>asdf
      {!user ? 
      <div>
        <h2>You shall not pass!</h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
      </div>
      : <Content blogs={blogs} logout={handleLogout}/>}
    </div>
  )
}

export default App