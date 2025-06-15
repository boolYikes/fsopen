import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import logoutService from '../services/logout'
import blogService from '../services/blogs'
import { onCRUDNotifyAction } from './notificationReducer'

const initialState = null
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set(state, action) {
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(action.payload),
      )
      blogService.setToken(action.payload.token)
      return action.payload
    },
    remove(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)
      return initialState
    },
    get(state, action) {
      return state
    },
  },
})

// thunks
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(set(user))
      dispatch(
        onCRUDNotifyAction(
          { content: `Welcome ${user.username}!!`, type: 'success' },
          5000,
        ),
      )
    } catch (e) {
      dispatch(
        onCRUDNotifyAction({ content: 'Log in failed', type: 'error' }, 5000),
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await logoutService.logout()
      dispatch(remove())
      dispatch(
        onCRUDNotifyAction(
          { content: 'You have logged out.', type: 'success' },
          5000,
        ),
      )
    } catch (exception) {
      dispatch(
        onCRUDNotifyAction(
          { content: 'Something went wrong during logout.', type: 'error' },
          5000,
        ),
      )
    }
  }
}

export const leaseSession = (credentials) => {
  const expTime = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (exception) {
      return null
    }
  }
  return (dispatch) => {
    if (credentials) {
      const decoded = expTime(credentials.token)
      if (decoded.exp) {
        const expiresAt = decoded.exp * 1000
        const now = Date.now()
        const timeout = expiresAt - now
        if (timeout > 0) {
          setTimeout(() => {
            dispatch(remove())
          }, timeout)
        } else {
          dispatch(remove())
        }
      }
    }
  }
}

// actions
export const { remove, get, set } = authSlice.actions

// reducer
export default authSlice.reducer
