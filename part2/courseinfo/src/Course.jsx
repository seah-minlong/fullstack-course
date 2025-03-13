import Header from './Header.jsx'
import Part from './Part.jsx'

const Course = ({ course }) => {
    const parts = course.parts

    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div> 
            <Header course={course.name}/>
            {parts.map(part => 
                <Part key={part.id} part={part} /> 
            )}
            <p><b>total of {total} exercises</b></p>
        </div>
    );
}

export default Course