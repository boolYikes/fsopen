// Imports
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Form from './components/Form'
import ybService from './services/persons'
import Person from './components/Person'
import Message from './components/Message'
import './index.css'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [alertMessage, setAlert] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [message, setMessage] = useState({string:null, type:null})

  // Request data on load
  const hook = () => {
    ybService.selectAll()
    .then(wholeList => {
      setPersons(wholeList)
      setSearchRes(wholeList)
    })
  }
  useEffect(hook, [])

  // Name field charater check
  const handleChange = (event) => { // name field change handler
    setNewName(event.target.value)
    persons.filter(person => person.name === event.target.value).length > 0 ?
    setAlert('The name already exists.') : setAlert('You can use this name.')
  }
  // Number field character check ... just for fun
  const handleNumberInput = (event) => {
    event.target.value.length % 4 === 0 ? 
    setNewNumber(`${event.target.value}-`) :
    setNewNumber(event.target.value)
  }
  // 'Add' button handler including the update function
  const handleSubmit = (event) => {
    event.preventDefault()
    const newbie = {
      name: newName,
      id: (persons.length + 1).toString() + newName,
      number: newNumber
    }
    const tmpPerson = persons.filter(person => person.name === newbie.name)
    if (tmpPerson.length > 0) {
      const conf = window.confirm(`The name ${newbie.name} already exists. REPLACE IT?`)
      if(conf){
        // console.log(tmpPerson) // it's an array
        const modified = {
          id: tmpPerson[0].id, // don't change id !!
          name: newbie.name,
          number: newbie.number
        }
        ybService.update(modified)
        .then(result => {
          setPersons(persons.filter(person => person.id !== modified.id).concat(result))
          if(searchRes.filter(res => res.id === modified.id)){
            setSearchRes(searchRes.filter(res => res.id !== modified.id).concat(result))
          }
          showMessage('Successfully updated info.', 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showMessage('This person has been removed from the big brothers house', 'error')
          setPersons(persons.filter(person => person.id !== modified.id))
          setSearchRes(searchRes.filter(res => res.id !== modified.id))
          setNewName('')
          setNewNumber('')
        })
      }
    }else if (newbie.number.split('-').filter(n => isNaN(parseInt(n))).length > 0) {
      alert('The number contains non-digits.')
    }else{
      ybService.insert(newbie)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setSearchRes(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        showMessage('Successfully added new info.', 'success')
      })
    }
  }
  // For operations result messages
  const showMessage = (string, type) => {
    const newMessage = {
      string: string,
      type: type
    }
    setMessage(newMessage)
    setTimeout(()=>{
      setMessage({string:null, type:null})
    }, 4000)
  }
  // Search field handler
  const handleFilter = (event) => {
    const newRes = persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    // console.log(newRes)
    setSearchRes(newRes)
  }
  // deleeeeeeeete!
  const handleDelete = (id) => { 
    // console.log(id, ' will be deleted')
    const conf = window.confirm("Boot them?")
    if(conf){
      ybService.del(id)
      .then(result => {
        // console.log(result)
        showMessage(`${result.id} is the weakest link!`, 'success')
        const newList = persons.filter(person => person.id !== id)
        const newSearchRes = searchRes.filter(res => res.id !== id)
        setPersons(newList)
        setSearchRes(newSearchRes)
      })
      .catch(error => {
        showMessage('The person is no longer in database. Refreshing.', 'error')
        const newList = persons.filter(person => person.id !== id)
        const newSearchRes = searchRes.filter(res => res.id !== id)
        setPersons(newList)
        setSearchRes(newSearchRes)
      })
    }
  }
  return (
    <div>
      <Header title={'Phonebook'}/>
      <Message message={message.string} type={message.type}/>
      <Filter handler={handleFilter}/>
      <Header title={'Add people'}/>
      <Form submitHandler={handleSubmit} 
      textInputHandler={handleChange} 
      numberInputHandler={handleNumberInput}
      newName={newName} newNumber={newNumber} alertMessage={alertMessage}/>
      <Header title={'Numbers'}/>
      <ul>
        {searchRes.map(p => 
          <Person key={p.id} name={p.name} number={p.number} del={() => handleDelete(p.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
