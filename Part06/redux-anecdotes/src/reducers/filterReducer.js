const SET_FILTER = 'SET_FILTER'

// Action creators
export const filterChange = (keyword) => ({
  type: SET_FILTER,
  payload: keyword
})

// Reducer
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload
    default:
      return state 
  }
}

export default filterReducer