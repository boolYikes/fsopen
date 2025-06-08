import { createSlice } from "@reduxjs/toolkit"

// createSlice
const initialState = ''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

// // Action creators
// const SET_FILTER = 'SET_FILTER'
// export const filterChange = (keyword) => ({
//   type: SET_FILTER,
//   payload: keyword
// })

// // Reducer
// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case SET_FILTER:
//       return action.payload
//     default:
//       return state 
//   }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer