import { useState } from "react";
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";

const App = () => {
	const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
	const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
        
        const check = persons.filter(p => p.name === newName).length === 0;
        if (check) {
            const personObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            };

            setPersons(persons.concat(personObject));
        } else {
            alert(`${newName} is already added to phonebook`)
        }

        setNewName("");
        setNewNumber("");
    };

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    const personsToShow = persons.filter(p => p.name.includes(newFilter));

	return (
		<div>
			<h2>Phonebook</h2>

            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <h3>add a new </h3>

            <PersonForm 
                addPerson={addPerson} 
                newName={newName} 
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
			
			<h2>Numbers</h2>

			<Persons personsToShow={personsToShow} />
		</div>
	);
};

export default App;
