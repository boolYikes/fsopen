import { createContext, useReducer, useContext } from "react"

const notiReducer = (state, action) => {
  //   console.log(`action type is: ${action.type}, action.payload is: ${action.payload}`)
  switch(action.type) {
    case "vote":
      return "You have voted. I know who you voted there is no privacy muahahaha!!"
    case "add":
      return "Nooo do not add entries! You are crippling the server!!!"
    case "remove":
      return ""
    case "error":
      return action.payload
    default:
      return state
  }
}

const NotiContext = createContext()

// Helpers
export const useNotiValue = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[0]
}
export const useNotiDispatch = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[1]
}

// used to wrap main
export const NotiContextProvider = (props) => {
    const [notification, notiDispatch] = useReducer(notiReducer, '')

    return (
        <NotiContext.Provider value={ [notification, notiDispatch] }>
            {props.children}
        </NotiContext.Provider>
    )
}

export default NotiContext