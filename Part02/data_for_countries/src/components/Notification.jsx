const Notification = ({message}) => {
    const type = !message ? '' : message.type
    const text = !message ? '' : message.text
    return (
        <>
            <p className={type}>{text}</p>
        </>
    )
}

export default Notification