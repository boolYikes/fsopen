import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

import { Form, Button } from "react-bootstrap"
import FloatingLabel from 'react-bootstrap/FloatingLabel'

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
    <div className="container">
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group>
          <FloatingLabel label="content">
            <Form.Control {...contentInput} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel label="author">
            <Form.Control {...authorInput} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel label="url">
            <Form.Control {...urlInput} />
          </FloatingLabel>
        </Form.Group>
        <div className="form-button-group">
          <Button type="submit" variant="success">create</Button> {' '}
          <Button type="reset" variant="dark">reset</Button>
        </div>
      </Form>
    </div>
  )

}

export default CreateNew