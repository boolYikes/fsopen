const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'black', backgroundColor: 'salmon' }}>
      {errorMessage}
    </div>
  )
}

export default Notification
