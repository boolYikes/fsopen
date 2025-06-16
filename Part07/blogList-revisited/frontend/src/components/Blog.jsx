import Button from './Button'
import PropTypes from 'prop-types'
import Comments from './Comments'
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
    paddingTop: '1rem',
    paddingLeft: '1rem',
    borderBottom: '1px solid black',
    marginBottom: 2,
  }

  const comments = blogContent.comments

  return (
    <div className="blog">
      <div style={blogStyle}>
        <h2>{blogContent.title}</h2>
        <p>
          <strong>Author</strong>:{blogContent.author}
        </p>
        <p>
          <strong>URL</strong>:{' '}
          <a href={blogContent.url}>Click at your own peril</a>💀
        </p>
        <p>
          <strong>{blogContent.likes}</strong> likes
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
        <Comments blog={blogContent} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  sessionInfo: PropTypes.object,
}

export default Blog
