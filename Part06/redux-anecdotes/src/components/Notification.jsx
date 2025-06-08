import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: `solid ${notification.content.includes('error') ? 'red' : 'green' }`,
    padding: 10,
    borderWidth: 1.5,
    marginBottom: '1.5rem',
    borderRadius: '4px',
    backgroundColor: notification.content.includes('error') ? '##ffa07a88' : '#ccffcc',
    display: notification.display
  }
  
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification