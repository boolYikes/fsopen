import Button from './Button'
import PropTypes from 'prop-types'
import Comments from './Comments'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Badge, Box, Typography } from '@mui/material'

const Blog = ({ sessionInfo }) => {
  const location = useLocation()
  const blogContent = location.state || {}
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }
  const handleDelete = async (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(
      onCRUDNotifyAction(
        { content: `Deleted ${blog.title}`, type: 'warning' },
        5000,
      ),
    )
  }

  return (
    <div className="blog">
      <div>
        <Typography variant="h6">Blog '{blogContent.title}'</Typography>
        <Typography>
          <strong>Author</strong>:{blogContent.author}
        </Typography>
        <Typography>
          <strong>URL</strong>:{' '}
          <a href={blogContent.url}>Click at your own peril</a>💀
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 500,
          }}
        >
          <Typography sx={{ paddingRight: 2, marginTop: 2 }}>
            <strong>Likes</strong>:
          </Typography>
          <Badge
            sx={{ px: 1 }}
            badgeContent={blogContent.likes}
            color="primary"
          >
            <ThumbUpIcon sx={{ px: 1 }} color="primary" />
          </Badge>
          <Button onClick={() => handleLike(blogContent)} buttonLabel="like" />
        </Box>
        {sessionInfo &&
        blogContent.author &&
        sessionInfo.username === blogContent.author ? (
          <Button
            disabled={false}
            onClick={() => handleDelete(blogContent)}
            buttonLabel="delete"
          />
        ) : (
          <Button disabled={true} buttonLabel="delete" />
        )}
        <Comments blog={blogContent} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  sessionInfo: PropTypes.object,
}

export default Blog
