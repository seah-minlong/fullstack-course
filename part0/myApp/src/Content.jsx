import Part from './Part.jsx'

function Content(props) {

    const parts = props.parts;
    const exercises = props.exercises;

    return (
        <div> 
            <Part part={parts[0]} exercises={exercises[0]}/>
            <Part part={parts[1]} exercises={exercises[1]}/>
            <Part part={parts[2]} exercises={exercises[2]}/>
        </div>
    );
}

export default Content