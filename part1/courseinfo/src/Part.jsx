
function Part(props) {
    const part = props.part;
    return(<p>{part.name} {part.exercises}</p>);
}

export default Part