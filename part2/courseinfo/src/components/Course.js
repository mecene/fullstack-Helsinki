// Component header
const Header = ({ course }) => <h1>{course.name}</h1>
// Component to render single course details
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
// Component to render collection of courses
const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>
// Component to render total of exercises 
const Total = ({ parts }) => {

    return (parts.reduce((s, p) => s + p.exercises, 0))
}

const Course = ({ courses }) => {

    // const course = courses.map(element => <Header course={element} />)
    //     console.log(course);

    return (
        <>

            {courses.map((course) => {
                //console.log(course.name);
                return (
                    <div key={course.id}>
                        <Header course={course} />
                        <Content parts={course.parts} />
                        <strong>Total of <Total parts={course.parts} /> exercises</strong>
                    </div>
                )

            })}
        </>
    )
}

// export Es6 module 
export default Course