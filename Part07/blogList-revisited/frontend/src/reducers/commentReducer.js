import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { onCRUDNotifyAction } from './notificationReducer'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    extract(state, action) {
      return action.payload
    },
    add(state, action) {
      state.push(action.payload)
    },
  },
})

export const addComment = (payload) => {
  return async (dispatch) => {
    const comment = await blogService.postComment(payload)
    dispatch(add(comment))
  }
}

export const getComments = (blog) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(blog)
    dispatch(extract(comments))
  }
}

export const { extract, add } = commentSlice.actions

export default commentSlice.reducer
