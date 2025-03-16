import { useState } from 'react'
import Button from './Button'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hide = { display: visible ? 'none' : '' }
    const show = { display: visible ? '' : 'none' }

    const toggle = () => {
        setVisible(!visible)
    }
    // pass the form and label
    return (
        <>
            <Button onClick={props.logout} buttonLabel='logout'/>
            <div style={hide}>
                <Button onClick={toggle} buttonLabel={props.buttonLabel}/>
            </div>
            <div style={show}>
                {props.children} 
                <Button onClick={toggle} buttonLabel='cancel'/>
                {/* Hello, {props.username}! <button onClick={props.logout}>logout</button>
                {props.username ? <PostingForm addBlog={props.addBlog}/> : <br/>} */}
            </div>
        </>
    )
}

export default Togglable