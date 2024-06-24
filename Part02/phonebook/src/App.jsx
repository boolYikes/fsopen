import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Form from './components/Form'
import ybService from './services/persons'
import Person from './components/Person'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [alertMessage, setAlert] = useState('')
  const [searchRes, setSearchRes] = useState([])
  // Request data
  const hook = () => {
    ybService.selectAll()
    .then(wholeList => {
      setPersons(wholeList)
      setSearchRes(wholeList)
    })
  }
  useEffect(hook, [])

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
      id: (persons.length + 1).toString() + newName,
      number: newNumber
    }
    const tmpPerson = persons.filter(person => person.name === newbie.name)
    if (tmpPerson) {
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
      })
    }
  }
  const handleFilter = (event) => { // search field handler
    const newRes = persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    // console.log(newRes)
    setSearchRes(newRes)
  }
  const handleDelete = (id) => { // deleeeeeeeete!
    // console.log(id, ' will be deleted')
    const conf = window.confirm("Boot them?")
    if(conf){
      ybService.del(id)
      .then(result => {
        // console.log(result)
        const newList = persons.filter(person => person.id !== id)
        const newSearchRes = searchRes.filter(res => res.id !== id)
        setPersons(newList)
        setSearchRes(newSearchRes)
      })
      .catch(error => console.log(error))
    }
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
      <ul>
        {searchRes.map(p => 
          <Person key={p.id} name={p.name} number={p.number} del={() => handleDelete(p.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
