import blogsService from '../services/blogs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { onCRUDNotifyAction } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const PostingForm = ({ toggle }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      blogsService.setToken(
        JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token,
      )

      const payload = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        url: formData.url.trim(),
      }
      dispatch(addBlog(payload))

      setFormData({
        title: '',
        author: '',
        url: '',
      })

      dispatch(
        onCRUDNotifyAction(
          {
            content: `Blog added by ${formData.author}!`,
            type: 'success',
          },
          5000,
        ),
      )
    } catch (exception) {
      dispatch(
        onCRUDNotifyAction(
          {
            content: exception.message,
            type: 'error',
          },
          10000,
        ),
      )
    }
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <label>
          title:
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="title"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          author:
          <input
            type="text"
            name="author"
            value={formData.author}
            placeholder="author"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          url:
          <input
            type="text"
            name="url"
            value={formData.url}
            placeholder="url"
            onChange={handleChange}
          />
        </label>
        <br />
        {/* onClick does not override the submit, so we can use two actions at once... is the hypothesis */}
        <button onClick={toggle} type="submit" data-testid="postbutton">
          create
        </button>
      </form>
    </>
  )
}

PostingForm.propTypes = {
  toggle: PropTypes.func.isRequired,
}

export default PostingForm
