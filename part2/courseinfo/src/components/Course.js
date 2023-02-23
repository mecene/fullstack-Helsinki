// Component header
const Header = ({ course }) => <h1>{course.name}</h1>
// Component to render single course details
const Part = ({ part }) =><p>{part.name} {part.exercises}</p>
// Component to render collection of courses
const Content = ({parts}) => 
       <>
       {parts.map(part => <Part  key={part.id} part={part}/>)} 
       </>

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts}/>
        </div>

    )
}
// export Es6 module 
export default Course