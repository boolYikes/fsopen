const Input = ({name, value, handler}) => {
    return (
        <div>
            {name}: <input value={value} onChange={handler}/>
        </div>
    )
}
export default Input