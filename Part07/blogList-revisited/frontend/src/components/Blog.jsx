import Button from './Button'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

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

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  return (
    <div className="blog">
      <div style={blogStyle}>
        <h2>{blogContent.title}</h2>
        <p>
          <strong>Author</strong>:{blogContent.author}
        </p>
        <p>
          <strong>URL</strong>: {blogContent.url}
        </p>
        <p>
          <strong>{blogContent.likes}</strong> likes{' '}
          <Button onClick={() => handleLike(blogContent)} buttonLabel="like" />
        </p>
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
      </div>
    </div>
  )
}

Blog.propTypes = {
  sessionInfo: PropTypes.object,
}

export default Blog
