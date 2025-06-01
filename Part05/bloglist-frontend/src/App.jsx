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
import SessionTimer from './components/SessionTimer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const expTime = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch (exception) {
        return null
      }
    }
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) { // if the credential exists
      const user = JSON.parse(loggedUserJSON)
      const decoded = expTime(user.token)
        if (decoded.exp) {
          const expiresAt = decoded.exp * 1000;
          const now = Date.now()
          const timeout = expiresAt - now;
          console.log(`timeout is ${timeout}`)
          if (timeout > 0) {
            setUser(user)
            blogService.setToken(user.token)
            setTimeout(() => {
              window.localStorage.removeItem('loggedBlogAppUser')
              setUser(null)
              blogService.setToken(null)
            }, timeout)
          } else {
            window.localStorage.removeItem('loggedBlogAppUser')
            setUser(null)
            blogService.setToken(null)
          }
        }
    }
  }, [])

  const handleUpdate = (modified) => {
    setBlogs(prev => prev
      .map(b => b.id === modified.id ? modified : b)
      .sort((a, b) => b.likes - a.likes)
    )
  }

  const handleDelete = (deleted) => {
    // pop the blog
    const newBlogs = blogs
      .filter(blog => blog.id !== deleted.id)
      .sort((a, b) => b.likes - a.likes)
    setBlogs(newBlogs)
  }
  
  const addBlogs = (newBlog) => {
    setBlogs([...blogs, newBlog].sort((a, b) => b.likes - a.likes))
    setMessage([`Created ${newBlog.title} by ${user.username}`, 'success'])
    const timer = setTimeout(() => {
      setMessage([])
    }, 3000)
    return () => clearTimeout(timer)
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
          <SessionTimer token={JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token} />
          <Button onClick={handleLogout} buttonLabel='logout'/>
          <Togglable buttonLabel1='create new' buttonLabel2='cancel' logout={handleLogout} hide={hide} show={show} toggle={toggle}>
            <PostingForm addBlog={addBlogs} toggle={toggle}/>
          </Togglable>
        </div>
      }
      {blogs.map(blog => 
          <Blog key={blog.id} sessionInfo={user} blog={blog} onUpdate={handleUpdate} onDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App