import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { onCRUDNotifyAction } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }, [blogs])

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          sessionInfo={user}
          blog={blog}
          onUpdate={() => handleLike(blog)}
          onDelete={() => {
            dispatch(deleteBlog(blog))
            dispatch(
              onCRUDNotifyAction(
                { content: `Deleted ${blog.title}`, type: 'warning' },
                5000,
              ),
            )
          }}
        />
      ))}
    </div>
  )
}

export default BlogList
