import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import voteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

// Debug
// import { filterChange } from './reducers/filterReducer'
// import { add } from './reducers/anecdoteReducer'

// The createStore method
// const reducer = combineReducers({
//   anecdotes: voteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)

// The configStore method
const store = configureStore({
  reducer: {
    anecdotes: voteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

// Debug
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('first'))
// store.dispatch(add('first meme'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {/* <div /> */}
  </Provider>
)