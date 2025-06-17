import { useLocation } from 'react-router-dom'

import {
  Typography,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const OwnedBlogs = () => {
  const location = useLocation()
  const { name, blogs } = location.state || {}

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          User {name}'s blogs
        </ListSubheader>
      }
    >
      {blogs &&
        blogs.map((blog) => (
          <ListItemButton key={blog.id}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={blog.title} />
          </ListItemButton>
        ))}
    </List>
  )
}

export default OwnedBlogs
