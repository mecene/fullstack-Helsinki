import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // get data from server with service persons -> get trigers promises then is the event handeler
  useEffect(() => {
    personService
      .getAll()
      .then(returnedAllPersons => setPersons(returnedAllPersons))
      .catch(error => {
        console.log('Failed to load ressources');
      })
  }, [])


  // save new added contact
  const handleForm = {
    handleNewName: (e) => setNewName(e.target.value),
    handleNewNumber: (e) => setNewNumber(e.target.value),
    addPerson: (e) => {
      e.preventDefault()
      const newObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1 // server manage assignment of ID
      }
      //find the name already exist
      const foundPerson = persons.find(person => person.name === newName)

      foundPerson
        ? window.confirm(`${foundPerson.name} is already added to the phonebook, replace the old number with the new one?`)
          ? personService
            .update(foundPerson.id, newObject)
            .then(response => setPersons(persons.map(person => person.id === response.id ? { ...person, number: newNumber } : person)))  // https://stackoverflow.com/questions/44524121/update-array-containing-objects-using-spread-operator
          : console.log('user denied request')
        : personService
          .create(newObject)
          .then(returnedPerson => setPersons(persons.concat(returnedPerson))) //setPersons(persons.concat(newObject))
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

  // remove the clicked item from list
  const handleRemove = (id) => {
    personService
      .deleteItem(id)
      .then(response => {
        //console.log('item deleted')
        setPersons(persons.filter(person => person.id !== id))//filter return a new object of the persons except the one deleted
      })
      .catch(error => {
        console.error(`ERROR : ${error}`)
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={handleRemove} />
    </div>
  )
}

export default App