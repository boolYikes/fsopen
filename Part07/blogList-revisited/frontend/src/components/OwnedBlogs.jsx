import { useLocation } from 'react-router-dom'

const OwnedBlogs = () => {
  const location = useLocation()
  const { name, blogs } = location.state || {}

  return (
    <div>
      <h2>{name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs && blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default OwnedBlogs
