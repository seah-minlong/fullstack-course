import { useState, useEffect } from "react";
import Search from "./Search.jsx";
import countriesService from "./services/countries.js";
import Countries from "./Countries.jsx";
import Country from "./Country.jsx";

const App = () => {

    const [newSearch, setNewSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleSearchChange = (event) => {
        setSelectedCountry(null);
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
            {selectedCountry ? (
                <Country country={selectedCountry} />
            ) : (
                <Countries countries={countries} search={newSearch} showCountry={setSelectedCountry}/>
            )}
        </div>
    );
};

export default App;
