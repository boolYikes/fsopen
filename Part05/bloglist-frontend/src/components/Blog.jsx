import Button from './Button'
import blogsService from '../services/blogs'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  // Must not share state with Togglable. Shoulda kept the states inside the Togglable?
  const [vis, setVis] = useState(false)
  const [blogContent, setBlogContent] = useState(props.blog)
  // const [likes, setLikes] = useState(0)
  // const [liked, setLiked] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }

  const updateLike = async () => {
    try {
      blogsService.setToken(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)
      const res = await blogsService.like(blogContent)
      // console.log(`LIKE UPDATED, RESPONSE: ${res}`)
      setBlogContent(res)
      props.onUpdate(res)
    } catch (exception) {
      console.error(exception)
    }
  }

  const deleteBlog = async () => {
    try{
      // const confirmed = window.confirm("Will you do me the honor of being my terminator?")
      // if (confirmed) {
      blogsService.setToken(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)
      await blogsService.del(blogContent)
      props.onDelete(blogContent) // this prolly should not be -> must validate
      // }
    } catch (exception) {
      console.error(exception)
    }
  }
  return (
    <div className='blog'>
      {!vis?
        <div style={blogStyle}>
          {blogContent.title} by {blogContent.author} {' '}
          <Button onClick={() => setVis(!vis)} buttonLabel='show all'/>
        </div>
        :
        <div style={blogStyle}>
            Title: {blogContent.title} {' '}
          <Button onClick={() => setVis(!vis)} buttonLabel='summary'/><br/>
            Author: {blogContent.author} <br/>
            URL: {blogContent.url} <br/>
            Likes: {blogContent.likes} {' '}
          <Button onClick={updateLike} buttonLabel='like'/><br/>
          {props.sessionInfo && blogContent.author && props.sessionInfo.username === blogContent.author
            ? <Button disabled={false} onClick={deleteBlog} buttonLabel='delete'/>
            // ? console.log(blogContent.author)
            : <Button disabled={true} buttonLabel='delete'/>
          }
        </div>
      }
    </div>
  )}

Blog.propTypes = {
  sessionInfo: PropTypes.object,
  blog: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog