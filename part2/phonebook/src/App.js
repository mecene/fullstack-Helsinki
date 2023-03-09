import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // get data from server with axios -> get trigers promises then is the event handeler
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleForm = {
    handleNewName: (e) => setNewName(e.target.value),
    handleNewNumber: (e) => setNewNumber(e.target.value),
    addPerson: (e) => {
      e.preventDefault()
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      //filter trough array to find value
      const alreadyExist = persons.filter(person => person.name === newName).length > 0
      // ternary operator to return boolean if name exist
      alreadyExist ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newObject))
      // reset input value
      setNewName('')
      setNewNumber('')
    }
  }
  // set the state of search to the input value (lower case)
  const handleChange = (e) => setSearch(e.target.value.toLowerCase())

  //conditionel of collection to show if searched
  const personsToShow = search.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(search))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App