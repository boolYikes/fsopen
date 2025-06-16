import { useSelector, useDispatch } from 'react-redux'
import { addComment, getComments } from '../reducers/commentReducer'
import { useEffect } from 'react'

const Comments = ({ blog }) => {
  const comments = useSelector((state) => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments(blog))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      comment: e.target.comment.value,
      blog: blog,
    }
    dispatch(addComment(payload))
    e.target.comment.value = ''
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4>Comments</h4>
      {comments &&
        comments.map((comment) => <p key={comment.id}>{comment.content}</p>)}

      <form onSubmit={handleSubmit}>
        <input name="comment" type="text" placeholder="type your comment" />
      </form>
    </div>
  )
}

export default Comments
