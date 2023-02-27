import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '004474444444444'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    //filter trough array to find value
    const alreadyExist = persons.filter(person => person.name === newName).length > 0
    // ternary operator to return boolean if name exist
    alreadyExist ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newObject))
    // reset input value
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>

    </div>
  )
}

export default App