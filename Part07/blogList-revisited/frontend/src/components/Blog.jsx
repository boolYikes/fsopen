import Button from './Button'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  // Must not share state with Togglable. Shoulda kept the states inside the Togglable?
  const [vis, setVis] = useState(false)
  const blogContent = props.blog
  // const [likes, setLikes] = useState(0)
  // const [liked, setLiked] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  return (
    <div className="blog">
      {!vis ? (
        <div style={blogStyle}>
          {blogContent.title} by {blogContent.author}{' '}
          <Button onClick={() => setVis(!vis)} buttonLabel="show all" />
        </div>
      ) : (
        <div style={blogStyle}>
          Title: {blogContent.title}{' '}
          <Button onClick={() => setVis(!vis)} buttonLabel="summary" />
          <br />
          Author: {blogContent.author} <br />
          URL: {blogContent.url} <br />
          Likes: {blogContent.likes}{' '}
          <Button onClick={props.onUpdate} buttonLabel="like" />
          <br />
          {props.sessionInfo &&
          blogContent.author &&
          props.sessionInfo.username === blogContent.author ? (
            <Button
              disabled={false}
              onClick={props.onDelete}
              buttonLabel="delete"
            />
          ) : (
            // ? console.log(blogContent.author)
            <Button disabled={true} buttonLabel="delete" />
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  sessionInfo: PropTypes.object,
  blog: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Blog
