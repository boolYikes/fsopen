import { useState } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Search from './components/Search'
import Form from './components/Form'
const App = () => {
  // States
  const [persons, setPersons] = useState([ // Data for tests
    {name: 'Arto Hellas', id: 1, number: '012-3456-7890'},
    {name: 'Dyrm Wyrm', id: 2, number: '011-1234-5678'},
    {name: 'John Doe', id: 3, number: '234-5264-7678'},
    {name: 'Angie McGraw', id:4, number: '456-234-1233'},
    {name: 'Simon Sean', id:5, number: '678-12-4567'},
    {name: 'Nom De Plume', id:6, number: '345-123-234'},
    {name: 'Terminator', id:7, number: '878-323-454'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [alertMessage, setAlert] = useState('')
  const [searchRes, setSearchRes] = useState(persons)
  // Handlers
  const handleChange = (event) => { // name field change handler
    setNewName(event.target.value)
    persons.filter(person => person.name === event.target.value).length > 0 ?
    setAlert('The name already exists.') : setAlert('You can use this name.')
  }
  const handleNumberInput = (event) => { // number field change handler
    event.target.value.length % 4 === 0 ? 
    setNewNumber(`${event.target.value}-`) :
    setNewNumber(event.target.value)
  }
  const handleSubmit = (event) => { // add button handler
    event.preventDefault()
    const newbie = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    if (persons.filter(person => person.name === newbie.name).length > 0) {
      alert(`The name ${newbie.name} already exists.`)
    }else if (newbie.number.split('-').filter(n => isNaN(parseInt(n))).length > 0) {
      alert('The number contains non-digits.')
    }else{
      setPersons(persons.concat(newbie))
      setSearchRes(persons.concat(newbie))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleFilter = (event) => { // search field handler
    const newRes = persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    // console.log(newRes)
    setSearchRes(newRes)
  }
  return (
    <div>
      <Header title={'Phonebook'}/>
      <Filter handler={handleFilter}/>
      <Header title={'Add people'}/>
      <Form submitHandler={handleSubmit} 
      textInputHandler={handleChange} 
      numberInputHandler={handleNumberInput}
      newName={newName} newNumber={newNumber} alertMessage={alertMessage}/>
      <Header title={'Numbers'}/>
      <Search result={searchRes}/>
    </div>
  )
}

export default App
