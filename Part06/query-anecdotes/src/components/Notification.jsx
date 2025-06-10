import { useNotiValue } from "../NotiContext"

const Notification = () => {
  const noti = useNotiValue()

  const isError = noti.includes('error')

  const style = {
    border: `2px solid ${isError ? 'red' : 'green'}`,
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: isError ? 'salmon' : 'lightgreen'
  }
  
  if (noti) {
    return (
      <div style={style}>
        {noti}
      </div>
    )
  } else {
    return null
  }

}

export default Notification
