import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleChange = (e) => {
    // find the person that includes the inputs value 
    setSearch(e.target.value.toLowerCase())
  }

  const addPerson = (e) => {
    e.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1
    }
    //filter trough array to find value
    const alreadyExist = persons.filter(person => person.name === newName).length > 0
    // ternary operator to return boolean if name exist
    alreadyExist ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newObject))
    // reset input value
    setNewName('')
    setNewNumber('')
  }
  //conditionel of collection to show if searched
  const personsToShow = search.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(search))
    : persons
    
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with:
        <input type="text" onChange={handleChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>

    </div>
  )
}

export default App