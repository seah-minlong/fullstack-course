import { useState, useEffect } from "react";
import axios from 'axios';
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        const isDuplicate = persons.some(p => p.name === newName);
        if (isDuplicate) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            };
            setPersons(persons.concat(personObject));
        }

        setNewName("");
        setNewNumber("");
    };

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    })

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
