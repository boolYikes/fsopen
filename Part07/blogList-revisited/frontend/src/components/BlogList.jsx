import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import PostingForm from './PostingForm'

import { Typography, Box, Button as MUIButton } from '@mui/material'

const BlogList = ({ sessionInfo }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }, [blogs])

  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }
  const toggle = () => {
    setVisible(!visible)
  }

  return (
    <Box>
      <Typography variant="h6">Blogs</Typography>
      {sessionInfo && (
        <Togglable
          buttonLabel1="create new"
          buttonLabel2="cancel"
          hide={hide}
          show={show}
          toggle={toggle}
        >
          <PostingForm toggle={toggle} />
        </Togglable>
      )}
      {sortedBlogs.map((blog) => (
        <Box
          key={blog.id}
          sx={{
            backgroundColor: '#fff',
            color: 'black',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            '&:hover': {
              backgroundColor: 'custom.tertiary',
              color: 'primary.main',
              textDecoration: 'none',
            },
          }}
        >
          <MUIButton
            variant="text"
            component={Link}
            to={`/blogs/:id`}
            className="blog-list-item"
            state={blog}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Typography>{blog.title}</Typography>
          </MUIButton>
        </Box>
      ))}
    </Box>
  )
}

export default BlogList
