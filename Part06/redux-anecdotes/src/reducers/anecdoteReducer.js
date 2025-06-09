import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// The createSlice method
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    add(state, action) { // ES6 shorthand actions
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const target = state.find(anecd => anecd.id === id)
      const modified = {
        ...target,
        votes: target.votes + 1
      }
      
      return state.map(anecd =>
        anecd.id !== id ? anecd : modified
      )
    },
    init(state, action) {
      return action.payload
    }
  }
})

// async action creators
export const voteAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.voteStuff(content)
    dispatch(vote(anecdote.id))
  }
}
export const initAnecdotes = () => {
  return async dispatch => {
    const anecdts = await anecdoteService.getAll()
    dispatch(init(anecdts))
  }
}
export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}

// actions
export const { add, vote, init } = anecdoteSlice.actions

// reducer
export default anecdoteSlice.reducer