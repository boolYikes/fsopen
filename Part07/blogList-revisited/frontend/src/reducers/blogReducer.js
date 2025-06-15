import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { onCRUDNotifyAction } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload.id
      const target = state.find((blog) => blog.id === id)
      const modified = {
        ...target,
        likes: target.likes + 1, // MUST VALIDATE
      }
      return state.map((blog) => (blog.id !== id ? blog : modified))
    },
    init(state, action) {
      return action.payload
    },
    del(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(init(blogs))
  }
}

export const likeBlog = (payload) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.like(payload)
      dispatch(like(blog))
      dispatch(
        onCRUDNotifyAction(
          { content: `Liked ${blog.title}`, type: 'success' },
          5000,
        ),
      )
    } catch (e) {
      dispatch(
        onCRUDNotifyAction(
          { content: 'You cannot like it twice', type: 'error' },
          5000,
        ),
      )
    }
  }
}

export const addBlog = (payload) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(payload)
    dispatch(create(newBlog))
  }
}

export const deleteBlog = (payload) => {
  return async (dispatch) => {
    const newBlog = await blogService.del(payload)
    dispatch(del(newBlog))
  }
}

export const { create, init, like, del } = blogSlice.actions

export default blogSlice.reducer
