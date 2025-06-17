import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { useState } from 'react'

import { Box, Button as MUIButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyIcon from '@mui/icons-material/Key'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const payload = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }
    dispatch(login(payload)) // noti handled internally
  }
  return (
    <>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          paddingBottom: '4px',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: 'white',
            mx: 2,
          }}
        >
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            value={username}
            variant="standard"
            name="Username"
            label="username"
            required
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: 'white',
            mx: 2,
          }}
        >
          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            type="password"
            variant="standard"
            value={password}
            name="Password"
            label="password"
            required
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
          />
        </Box>
        <MUIButton
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
        >
          login
        </MUIButton>
      </form>
    </>
  )
}

export default LoginForm
