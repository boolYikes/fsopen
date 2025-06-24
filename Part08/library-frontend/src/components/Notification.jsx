const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red', backgroundColor: 'salmon' }}>
      {errorMessage}
    </div>
  )
}

export default Notification
