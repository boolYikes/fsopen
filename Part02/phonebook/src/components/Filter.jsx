const Filter = ({handler}) => {
    return (
        <div>
        search by name: <input onChange={handler}/>
        </div>
    )
}

export default Filter