
const PersonForm = ({handleForm, newName, newNumber}) => {
    
    return(
        <form onSubmit={handleForm.addPerson}>
        <div>
          name: <input onChange={handleForm.handleNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleForm.handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}
export default PersonForm