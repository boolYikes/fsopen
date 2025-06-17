import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'

import LoginForm from './LoginForm'
import SessionTimer from './SessionTimer'
import Button from './Button'

import {
  AppBar,
  Toolbar,
  Typography,
  Link as MUILink,
  Button as MUIButton,
  Box,
  IconButton,
} from '@mui/material'
import WebIcon from '@mui/icons-material/Web'
import PeopleIcon from '@mui/icons-material/People'

// import './Menu.css'

const Menu = ({ sessionInfo }) => {
  const dispatch = useDispatch()

  return (
    <AppBar
      className="menu-bar"
      position="static"
      color="primary"
      elevation={2}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <MUIButton
            component={Link}
            color="inherit"
            href="#"
            to="/"
            className="menu-bar-item"
            underline="hover"
            sx={{ mx: 3 }}
            startIcon={<WebIcon />}
          >
            Blogs
          </MUIButton>
          <MUIButton
            href="#"
            color="inherit"
            to="/users"
            className="menu-bar-item"
            underline="hover"
            component={Link}
            sx={{ mx: 3 }}
            startIcon={<PeopleIcon />}
          >
            Users
          </MUIButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {!sessionInfo ? (
            <LoginForm />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Hi, {sessionInfo.name}!</Typography>
              <SessionTimer token={sessionInfo.token} />
              <Button onClick={() => dispatch(logout())} buttonLabel="logout" />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
