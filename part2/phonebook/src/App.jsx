import { useState, useEffect } from "react";
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import personService from './services/persons.js'
import Notification from './Notification.jsx'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [notification, setNotification] = useState(null)

    const addPerson = (event) => {
        event.preventDefault();

        const isDuplicate = persons.some(p => p.name === newName);
        if (isDuplicate & newNumber === "") {
            alert(`${newName} is already added to phonebook`);
            return;
        } else if (isDuplicate) {
            // New number added but duplicate name
            const confirmed = confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
            if (confirmed) {
                const person = persons.find(p => p.name === newName)
                updateNumber(person, newNumber);

                setNewName("");
                setNewNumber("");
                return
            }
        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1),
        };

        personService  
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
            })
        
        setNotification(`Added ${personObject.name}`)
        setTimeout(() => {
            setNotification(null)
        }, 2000)

        setNewName("");
        setNewNumber("");
    };

    useEffect(() => {
        personService
            .getAll()
            .then(personsData => {
                setPersons(personsData)
            })
    })

    const deletePerson = person => {
        personService
            .delPerson(person)
            .then(deletedPerson => {
                console.log(`deleted ${person.name} succesfully`)
                setPersons(persons.filter(person => person.id !== deletedPerson.id))
            })
    }

    const updateNumber = (person, newNumber) => {
        console.log(person)
        const changedPerson = { ...person, number: newNumber }

        personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => p.id === person.id ? returnedPerson : p));
            })
            .catch(error => {
                setErrorMessage(
                    `Person '${person.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(p => p.id !== person.id))
            })
    }

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
            <Notification message={notification}/>
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

			<Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
		</div>
	);
};

export default App;
