import Button from './Button'

const Togglable = (props) => {
    
    // pass the form and label
    return (
        <>
            <div style={props.hide}>
                <Button onClick={props.toggle} buttonLabel={props.buttonLabel1}/>
            </div>

            <div style={props.show}>
                {props.children} 
                <Button onClick={props.toggle} buttonLabel={props.buttonLabel2}/>
                {/* Hello, {props.username}! <button onClick={props.logout}>logout</button>
                {props.username ? <PostingForm addBlog={props.addBlog}/> : <br/>} */}
            </div>
        </>
    )
}

export default Togglable