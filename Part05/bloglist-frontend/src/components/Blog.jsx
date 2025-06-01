import Button from "./Button"
import blogsService from '../services/blogs'
import { useState, useRef } from "react"

const Blog = ({ blog }) => {
  // Must not share state with Togglable. Shoulda kept the states inside the Togglable?
  const [vis, setVis] = useState(false)
  const [blogContent, setBlogContent] = useState(blog)
  // const [likes, setLikes] = useState(0)
  // const [liked, setLiked] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }

  const updateLike = async (blog) => {
    try {
      blogsService.setToken(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)
      const res = await blogsService.like(blog)
      console.log(`LIKE UPDATED, RESPONSE: ${res}`)
      setBlogContent(res)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
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
            <Button onClick={() => updateLike(blogContent)} buttonLabel='like'/>
          </div>
        }
    </div>  
)}

export default Blog