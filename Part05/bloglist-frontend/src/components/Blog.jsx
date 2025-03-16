import Button from "./Button"
import { useState } from "react"

const Blog = ({ blog }) => {
  // Must not share state with Togglable. Shoulda kept the states inside the Togglable?
  const [vis, setVis] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }

  const updateLike = () => {
    // add update to services that routes to update like backend api
    console.log("LIKE UPDATED")
  }

  return (
    <div>
        {!vis?
          <div style={blogStyle}>
            {blog.title} by {blog.author}
            <Button onClick={() => setVis(!vis)} buttonLabel='show all'/>
          </div>
          :
          <div style={blogStyle}>
            Title: {blog.title} <br/> 
            Author: {blog.author} <br/> 
            URL: {blog.url} <br/> 
            Likes: {blog.likes} <Button onClick={() => updateLike()} buttonLabel='like'/> <br/>
            <Button onClick={() => setVis(!vis)} buttonLabel='summary'/>
          </div>
        }
    </div>  
)}

export default Blog