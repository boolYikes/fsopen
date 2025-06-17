import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Typography,
  Button as MUIButton,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material'

const User = ({ user }) => {
  const totalBlogs = user.blogs.length
  return (
    <>
      <TableCell>
        <MUIButton
          variant="text"
          component={Link}
          to={`/users/${user.id}`}
          state={user}
        >
          {user.name}
        </MUIButton>
      </TableCell>
      <TableCell>
        <Typography>{totalBlogs}</Typography>
      </TableCell>
    </>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Box>
      <Typography variant="h6">Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <User user={user} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

User.propTypes = {
  user: PropTypes.object,
}

export default Users
