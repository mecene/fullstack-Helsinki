// Component header
const Header = ({ course }) => <h1>{course.name}</h1>
// Component to render single course details
const Part = ({ part }) =><p>{part.name} {part.exercises}</p>
// Component to render collection of courses
const Content = ({parts}) => 
       <>
       {parts.map(part => <Part  key={part.id} part={part}/>)} 
       </>
// Component to render total of exercises 
const Total = ({parts}) => {
    let total = 0
    parts.forEach(part => total += part.exercises) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    return(
        total
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts}/>
            <strong>Total of <Total parts={course.parts}/> exercises</strong>
        </div>

    )
}
// export Es6 module 
export default Course