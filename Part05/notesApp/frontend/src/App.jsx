import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Tobblable'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  // hook one
  const hook = () => {
    // console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  // hook for user session retrieval
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, []) // empty list = execute hook when the component is rendered for the first time

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`Don't do hacking: ${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <p>Welcome, {user.name === undefined ? "user" : user.name}!
        <button onClick={handleLogout}>logout</button>
      </p>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )

  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server: ${error}`
        )
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null
        ? <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        : noteForm()
      }
      <div>
        <button id='showButton' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
