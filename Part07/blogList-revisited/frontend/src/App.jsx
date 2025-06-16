import { useEffect } from 'react'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

import Message from './components/Message'
import BlogList from './components/BlogList'
import Users from './components/Users'
import Menu from './components/Menu'
import OwnedBlogs from './components/OwnedBlogs'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { leaseSession } from './reducers/authReducer'

const App = () => {
  const user = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    // blog list rendering
    dispatch(initBlogs())
    dispatch(initUsers())
    dispatch(leaseSession(user))
  }, [])

  return (
    <div data-testid="whole">
      <h1>The King of Brutalism</h1>
      <Menu sessionInfo={user} />
      <Message />
      <Routes>
        <Route path="/" element={<BlogList sessionInfo={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<OwnedBlogs />} />
        <Route path="/blogs/:id" element={<Blog sessionInfo={user} />} />
      </Routes>
    </div>
  )
}

export default App
