const Button = ({ onClick, buttonLabel }) => {
    return (
        <>
            <button onClick={onClick}>{buttonLabel}</button>
        </>
    )
}

export default Button