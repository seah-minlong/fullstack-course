import { useState, useEffect } from "react";
import Search from "./Search.jsx";
import countriesService from "./services/countries.js"
import Countries from "./Countries.jsx"

const App = () => {

    const [newSearch, setNewSearch] = useState('');
    const [countries, setCountries] = useState([]);

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    }
    
    useEffect(() => {
        countriesService
            .getAll()
            .then(response => {
                console.log("Retrieved all countries");
                setCountries(response);
            })
    }, [])

    return (
        <div>
            <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
            <Countries countries={countries} search={newSearch} />
        </div>
    );
};

export default App;
