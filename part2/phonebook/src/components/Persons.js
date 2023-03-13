// import Button from "./Button"
// import personService from "../services/persons.js"

// const deletePerson = (id) =>{
//     personService.deleteItem(id)
    
// }

const Persons = ({persons, onClick}) => {
    return (
        <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() => onClick(person.id)}>delete</button>{/*<Button label={'delete'} onClick={()=>{deletePerson(person.id)}}/>*/}</li>)}
        </ul>
    )
}
export default Persons