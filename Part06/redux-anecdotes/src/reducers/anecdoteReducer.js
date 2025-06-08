// init
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

// Action types
const VOTE = 'VOTE'
const ADD_ANECDOTE = 'ADD_ANECDOTE'

// Action creators
export const vote = (id) => ({
  type: VOTE,
  payload: id
})
export const add = (content) => ({
  type: ADD_ANECDOTE,
  payload: {
    id: getId(),
    content,
    votes: 0
  }
})

// Reducer
const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTE:
      return ( 
        state.map(anecdote =>
          anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
        )
      )
    case ADD_ANECDOTE:
      return [...state, action.payload]
    default:
      return state 
  }
}

export default voteReducer