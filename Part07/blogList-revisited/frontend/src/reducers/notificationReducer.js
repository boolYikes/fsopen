import { createSlice, current } from '@reduxjs/toolkit'

const initialState = { display: 'none', content: '', type: '' }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      const noti = {
        display: 'block',
        content: action.payload.content,
        type: action.payload.type,
      }
      return noti
    },
    remove(state, action) {
      return initialState
    },
  },
})

export const onCRUDNotifyAction = (payload, time) => {
  return (dispatch) => {
    dispatch(notify(payload))
    setTimeout(() => dispatch(remove()), time)
  }
}

export const { notify, remove } = notificationSlice.actions
export default notificationSlice.reducer
