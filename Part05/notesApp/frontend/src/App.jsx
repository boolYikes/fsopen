import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  // for now, to log out, use window.localStorage.removeItem('loggedNoteappUser') or .clear()

  // console.log('render', notes.length, 'notes ')
  const loginForm = () => ( // shorthand for { return (...) }
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
  )
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
      <button type='submit'>save</button>
    </form>
  )
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
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
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
  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null
        ? loginForm()
        : <div>
            <p>Welcome, {user.name === undefined ? "Blabla" : user.name}!</p>
            {noteForm()}
          </div>
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
