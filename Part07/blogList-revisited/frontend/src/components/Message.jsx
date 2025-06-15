import { useSelector } from 'react-redux'

const Message = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    display: notification.display,
  }

  const colorMapping = {
    warning: { edge: 'orange', body: '#FFD8A8' },
    error: { edge: 'red', body: '#FFB8B8' },
    success: { edge: 'green', body: '#B8FFC9' },
  }

  const pStyle = {
    color: colorMapping[notification.type]?.edge,
    backgroundColor: colorMapping[notification.type]?.body,
  }

  return (
    <div style={style}>
      {
        <p style={pStyle}>
          <strong>{notification.content}</strong>
        </p>
      }
    </div>
  )
}

export default Message
