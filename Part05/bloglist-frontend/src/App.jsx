import { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostingForm from './components/PostingForm'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'
import Button from './components/Button'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])
  const [visible, setVisible] = useState(false)

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

  const refreshBlogs = (newBlog) => {
    setBlogs([...blogs, newBlog])
    setMessage([`Created ${newBlog.title} by ${user.username}`, 'success'])
    setTimeout(() => {
      setMessage([])
    }, 3000)
  } // for refreshing after creation

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
      setMessage([`Welcome ${username}!!`, 'success'])
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage([])
      }, 3000)
    } catch (exception) {
      setMessage(['Invalid credential given.', 'error'])
      setTimeout(() => {
        setMessage([])
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
      setMessage(['Something went wrong during logout.', 'error'])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggle = () => {
      setVisible(!visible)
  }
  return (
    <div>
      <h1>The King of Brutalism</h1>
      <Message message={message}/>
      <h2>Blogs</h2>
      {!user ? 
        <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername}/>
      : 
        <div>
          <Button onClick={handleLogout} buttonLabel='logout'/>
          <Togglable buttonLabel1='create new' buttonLabel2='cancel' logout={handleLogout} hide={hide} show={show} toggle={toggle}>
            <PostingForm addBlog={refreshBlogs} toggle={toggle}/>
          </Togglable>
        </div>
      }
      {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App