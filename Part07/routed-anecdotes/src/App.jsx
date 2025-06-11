import { useState } from 'react'
import {
  Routes, Route, useMatch, Navigate
} from 'react-router-dom'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Menu from './components/Menu'

const initState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initState)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.floor(Math.random() * 1000000);
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification("Addeeeeeeeeeeeeeeeeed!!!!!!!!!!!")
    setTimeout(() => setNotification(""), 5000)
  }

  const match = useMatch('/:id')
  const anecdoteToShow = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1 style={{ borderBottom: '1px solid black' }}>Software anecdotes</h1>
      <Menu />
      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem'}}>{notification}</div>
      <Routes>
        <Route path="/noti" element={<Navigate replace to="/"/>}   />
        <Route path="/:id" element={<Anecdote anecdote={anecdoteToShow} vote={vote}/>} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
