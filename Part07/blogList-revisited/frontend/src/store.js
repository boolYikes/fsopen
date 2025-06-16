import { configureStore } from '@reduxjs/toolkit'

import notiReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: userReducer,
    comments: commentReducer,
  },
})

export default store
