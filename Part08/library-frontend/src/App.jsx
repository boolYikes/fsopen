import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Nav from './components/Nav'
import Notification from './components/Notification'
import { Routes, Route } from 'react-router-dom'
import { ALL_AUTHORS, ALL_GENRES, FIND_BOOKS_BY_GENRE } from './utils/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Filters from './components/Filters'
import Recommended from './components/Recommended'
import Subscription from './components/Subscription'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [userInfo, setUserInfo] = useState(null) // not used at this point. but if we were to use useEffect ...?
  const [filter, setFilter] = useState(null)

  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const filtered = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: filter ? { id: filter } : undefined,
  })
  const allGenresResult = useQuery(ALL_GENRES)

  const notify = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const user = JSON.parse(localStorage.getItem('library-user-info'))
  const token = user?.value
  // The hook is consistently called but not the query -> the code of hooks is adhered to
  const recommendation = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { id: user?.favoriteGenre },
    skip: !user,
  })

  return (
    <div>
      <Nav token={token} setUserInfo={setUserInfo} setMessage={notify} />
      <Notification errorMessage={errorMessage} />
      <Routes>
        <Route
          path="/"
          element={<Authors result={allAuthorsResult} noti={notify} />}
        />
        <Route
          path="/books"
          element={
            <>
              <Books result={filtered} />
              <Filters
                result={allGenresResult}
                filter={filter}
                setFilter={setFilter}
              />
            </>
          }
        />
        <Route
          path="/add"
          element={<NewBook setError={notify} filter={filter} />}
        />
        <Route
          path="/login"
          element={
            <LoginForm
              setUserInfo={setUserInfo}
              token={token}
              setMessage={notify}
            />
          }
        />
        <Route path="/signup" element={<SignUp setMessage={notify} />} />
        <Route
          path="/recommend"
          element={<Recommended result={recommendation} />}
        />
      </Routes>
      <Subscription token={token} />
    </div>
  )
}

export default App
