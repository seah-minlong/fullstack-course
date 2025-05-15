const Notification = ({message}) => {

    const successAddedStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    } 

    if (message === null) {
        return
    }
    
    return (
        <div style={successAddedStyle}>
            {message}
        </div>
    )
}

export default Notification;