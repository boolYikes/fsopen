import PropTypes, { string } from 'prop-types'

const Message = ({ message }) => {
  return (
    <>
      {message[1] === 'error'
        ? <p style={{ color: 'red', backgroundColor: '#FFB8B8' }}><strong>{message[0]}</strong></p>
        : <p style={{ color: 'green', backgroundColor: '#B8FFC9' }}><strong>{message[0]}</strong></p>}

    </>
  )
}

Message.propTypes = {
  message: PropTypes.arrayOf(string).isRequired
}

export default Message