import Button from './Button'
import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel1, buttonLabel2, hide, show, toggle, children }) => {

  // pass the form and label
  return (
    <>
      <div style={hide}>
        <Button onClick={toggle} buttonLabel={buttonLabel1}/>
      </div>

      <div style={show}>
        {children}
        <Button onClick={toggle} buttonLabel={buttonLabel2}/>
        {/* Hello, {props.username}! <button onClick={props.logout}>logout</button>
                {props.username ? <PostingForm addBlog={props.addBlog}/> : <br/>} */}
      </div>
    </>
  )
}

Togglable.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
  hide: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Togglable