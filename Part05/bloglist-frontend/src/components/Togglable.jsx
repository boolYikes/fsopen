import Button from './Button'

const Togglable = (props) => {
    
    // pass the form and label
    return (
        <>
            {/* Division of labor! This should not be here */}
            <Button onClick={props.logout} buttonLabel='logout'/>

            <div style={props.hide}>
                <Button onClick={props.toggle} buttonLabel={props.buttonLabel}/>
            </div>

            <div style={props.show}>
                {props.children} 
                <Button onClick={props.toggle} buttonLabel='cancel'/>
                {/* Hello, {props.username}! <button onClick={props.logout}>logout</button>
                {props.username ? <PostingForm addBlog={props.addBlog}/> : <br/>} */}
            </div>
        </>
    )
}

export default Togglable