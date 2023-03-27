import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonService from "./services/persons.js"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

  // get data from server with service persons -> get trigers promises then is the event handeler
  useEffect(() => {
    PersonService
      .getAll()
      .then(returnedAllPersons => setPersons(returnedAllPersons))
      .catch(error => {
        console.log('Failed to load ressources')
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

          ? PersonService
            .update(foundPerson.id, newObject)
            .then(response => {
              setPersons(persons.map(person => person.id === response.id ? { ...person, number: newNumber }: person))
              setMessage(`${newObject.name} number has been succesfully updated`)
              setIsSuccess(true)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })  // https://stackoverflow.com/questions/44524121/update-array-containing-objects-using-spread-operator
            .catch(error => {
              console.log(error)
              setMessage(`Information of ${newObject.name} has already been removed from the server`)
              setIsSuccess(false)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
          : console.log('User denied request')
        // if the persone doesn't exist, register data in DB
        : PersonService
          .create(newObject)
          .then(response => {
            setPersons(persons.concat(newObject))
            setMessage(`${newObject.name} has been successfully saved`)
            setIsSuccess(true)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }) //setPersons(persons.concat(newObject))
          .catch((error) => {
            console.error(error);
          });

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
    PersonService
      .deleteItem(id)
      .then(response => {
        //console.log('item deleted')
        setPersons(persons.filter(person => person.id !== id))//filter return a new object of the persons except the one deleted
      })
      .catch(error => {
        //console.error(`ERROR : ${error}`)
        setMessage(`ERROR : ${error}`)
        setIsSuccess(false)
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} notificationStyle={isSuccess} />
      <Filter handleChange={handleChange} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={handleRemove} />
    </div>
  )
}

export default App