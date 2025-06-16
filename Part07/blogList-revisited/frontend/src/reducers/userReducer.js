import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    init(state, action) {
      return action.payload
    },
    getOne(state, action) {
      return
    },
  },
})

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(init(users))
  }
}

export const { init, create, getOne } = userSlice.actions

export default userSlice.reducer
