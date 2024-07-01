const Message = ({message, type}) => {
    const cName = `message ${type}`
    if (message === null){
        return null
    }
    return (
        <div className={cName}>
            {message}
        </div>
    )
}

export default Message