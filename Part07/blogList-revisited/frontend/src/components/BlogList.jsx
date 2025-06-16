import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import PostingForm from './PostingForm'
import './BlogList.css'

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
    <div>
      <h2>Blogs</h2>
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
        <div key={blog.id} style={{ borderBottom: '1px solid black' }}>
          <Link to={`/blogs/:id`} className="blog-list-item" state={blog}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
