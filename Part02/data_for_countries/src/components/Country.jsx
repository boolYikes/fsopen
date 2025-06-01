const Country = ({name, handleShowButton}) => {

    return (
        <>
            <p>
                {name} 
                <button onClick={handleShowButton}>show</button>
            </p>
        </>
    )
}

export default Country