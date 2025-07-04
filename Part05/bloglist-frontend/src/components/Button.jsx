import { useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    minWidth: '200px',
    textAlign: 'center',
  },
}

const Button = ({ onClick, buttonLabel, disabled }) => {

  const [confirming, setConfirming] = useState(false)

  const handleClick = () => {
    if (buttonLabel === 'delete') {
      setConfirming(true)
    } else {
      onClick()
    }
  }

  const handleConfirm = () => {
    setConfirming(false)
    if (buttonLabel === 'delete') {
      onClick()
    }
    return true
  }

  const handleCancel = () => {
    setConfirming(false)
    return false
  }

  return (
    <>
      {disabled
        ? <button disabled data-testid='disabledButton'>{buttonLabel}</button>
        : <button onClick={handleClick} data-testid='normalButton'>{buttonLabel}</button>
      }

      {confirming ? (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p>Do me the honor of being my terminator?</p>
            <button onClick={handleConfirm}>Yesss 🙆‍♂️</button>
            <button onClick={handleCancel}>Nope 🐾</button>
          </div>
        </div>
      ):<></>}

    </>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default Button