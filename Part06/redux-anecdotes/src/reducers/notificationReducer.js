import { createSlice, current } from "@reduxjs/toolkit"

const initialState = { display: 'none', content: '' }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      const noti = {
        display: 'block', 
        content: action.payload
      }
      console.log(current(state))
      return noti
    },
    remove(state, action) {
      return initialState
    }
  }
})

export const { notify, remove } = notificationSlice.actions
export default notificationSlice.reducer