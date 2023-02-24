import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (e)=>{
    setNewName(e.target.value)
  }

  const addPerson = (e)=> {

    e.preventDefault()
    console.log(newName)
    const newObject = {
      name: newName
    }

    setPersons(persons.concat(newObject))
    setNewName('')

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=> <ul key={person.name}>{person.name}</ul> )}
    
    </div>
  )
}

export default App