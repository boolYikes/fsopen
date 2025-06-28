import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Nav from './components/Nav'
import Notification from './components/Notification'
import { Routes, Route } from 'react-router-dom'
import { ALL_AUTHORS, ALL_BOOKS } from './utils/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)

  const notify = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Nav token={token} setToken={setToken} setMessage={notify} />
      <Notification errorMessage={errorMessage} />
      <Routes>
        <Route
          path="/"
          element={<Authors result={allAuthorsResult} noti={notify} />}
        />
        <Route path="/books" element={<Books result={allBooksResult} />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route
          path="/login"
          element={
            <LoginForm setToken={setToken} token={token} setMessage={notify} />
          }
        />
        <Route path="/signup" element={<SignUp setMessage={notify} />} />
      </Routes>
    </div>
  )
}

export default App
