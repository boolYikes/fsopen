import { configureStore } from '@reduxjs/toolkit'

import notiReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
    auth: authReducer,
  },
})

export default store
