const Persons = ({ personsToShow, deletePerson }) => {

    const deletion = (person) => {
        const confirmedDelete = confirm(`Delete ${person.name} ?`)
        if (confirmedDelete) {
            deletePerson(person)
        }
    }

    return (
        personsToShow.map((person) => (
            <div key={person.name}>
                <span>{person.name} {person.number} </span>
                <button onClick={() => deletion(person)}>delete</button>
            </div>
        ))
    );
};

export default Persons;