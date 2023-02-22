const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) =>{
    console.log(part);
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}


const Content = ({ parts }) => {

    return(
        parts.map(value => <Part   part={value}/>) /// ====
    )

    
    
}




const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            {/* <Content parts={course.parts} /> */}
        </div>

    )
}



export default Course