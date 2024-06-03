import Input from './Input'
const Form = ({submitHandler, textInputHandler, numberInputHandler, newName, newNumber, alertMessage}) => {
    return (
        <div>
            <form onSubmit={submitHandler}>
                <Input name={'name'} value={newName} handler={textInputHandler}/>
                <Input name={'number'} value={newNumber} handler={numberInputHandler}/>
                <div>
                    {alertMessage}
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
      </div>
    )
}

export default Form