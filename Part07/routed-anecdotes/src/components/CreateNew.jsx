import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const contentInput = useField('text', 'content')
  const authorInput = useField('text', 'author')
  const urlInput = useField('text', 'url')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentInput.value,
      author: authorInput.value,
      info: urlInput.value,
      votes: 0
    })
    navigate('/noti')
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentInput.onReset()
    authorInput.onReset()
    urlInput.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content {' '}
          <input {...contentInput} />
        </div>
        <div>
          author {' '}
          <input {...authorInput} />
        </div>
        <div>
          url {' '}
          <input {...urlInput} />
        </div>
        <button type="submit">create</button> {' '}
        <button type="reset">reset</button>
      </form>
    </div>
  )

}

export default CreateNew