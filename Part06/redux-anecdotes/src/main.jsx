import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import App from './App'

import voteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

// import { filterChange } from './reducers/filterReducer'
// import { add } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: voteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('first'))
// store.dispatch(add('first meme'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {/* <div /> */}
  </Provider>
)