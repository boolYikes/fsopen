import { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostingForm from './components/PostingForm'
import Message from './components/Message'
import Button from './components/Button'
import SessionTimer from './components/SessionTimer'
import BlogList from './components/BlogList'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { leaseSession, logout } from './reducers/authReducer'

const App = () => {
  const user = useSelector((state) => state.auth)
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // blog list rendering
    dispatch(initBlogs())
    dispatch(leaseSession(user))
  })

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  return (
    <div data-testid="whole">
      <h1>The King of Brutalism</h1>
      <Message />
      <h2>Blogs</h2>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <SessionTimer
            token={
              JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token
            }
          />
          <Button onClick={() => dispatch(logout())} buttonLabel="logout" />
          <Togglable
            buttonLabel1="create new"
            buttonLabel2="cancel"
            hide={hide}
            show={show}
            toggle={toggle}
          >
            <PostingForm toggle={toggle} />
          </Togglable>
        </div>
      )}
      <BlogList user={user} />
    </div>
  )
}

export default App
