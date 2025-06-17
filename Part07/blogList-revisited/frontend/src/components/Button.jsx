import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button as MUIButton } from '@mui/material'

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      {disabled ? (
        <MUIButton
          variant="contained"
          size="small"
          color="theme.palette.custom.disabled"
          disabled
          data-testid="disabledButton"
        >
          {buttonLabel}
        </MUIButton>
      ) : (
        <MUIButton
          variant="contained"
          size="small"
          onClick={handleClick}
          color="secondary"
          data-testid="normalButton"
        >
          {buttonLabel}
        </MUIButton>
      )}

      {confirming ? (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p>Do me the honor of being my terminator?</p>
            <MUIButton
              size="small"
              variant="contained"
              color="primary"
              onClick={handleConfirm}
            >
              Yesss 🙆‍♂️
            </MUIButton>
            <MUIButton
              size="small"
              variant="contained"
              color="theme.palette.custom.tertiary"
              onClick={handleCancel}
            >
              Nope 🐾
            </MUIButton>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default Button
