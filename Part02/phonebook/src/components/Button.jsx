const Button = ({handler, name}) => {
    return(
        <>
            <button onClick={handler}>{name}</button>
        </>
    )
}

export default Button