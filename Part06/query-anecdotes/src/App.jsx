

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'

const App = () => {

  return (
    <div style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      <h2>Anecdote app</h2>
    
      <Notification />
      <AnecdoteForm />
      <Anecdotes />
      
    </div>
  )
}

export default App
