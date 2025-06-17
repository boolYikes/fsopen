import { useSelector, useDispatch } from 'react-redux'
import { addComment, getComments } from '../reducers/commentReducer'
import { useEffect } from 'react'
import { Divider, TextField, Typography } from '@mui/material'

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
      <Divider />
      <Typography variant="h6">Comments</Typography>
      {comments &&
        comments.map((comment) => (
          <Typography key={comment.id}>{comment.content}</Typography>
        ))}

      <form onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          label="write your comment"
          name="comment"
          type="text"
          placeholder="type your comment"
        />
      </form>
    </div>
  )
}

export default Comments
