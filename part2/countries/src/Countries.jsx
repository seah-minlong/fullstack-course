import Country from "./Country.jsx";

const Countries = ({ countries, search, showCountry }) => {
    console.log(search);

    if (search === '') {
        return;
    }

    search = search.toLowerCase();

    const countriesToShow = countries.filter(c => 
        c.name.common.toLowerCase().includes(search) || 
        c.name.official.toLowerCase().includes(search)
    );
    
    if (countriesToShow.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countriesToShow.length === 1) {
        showCountry(countriesToShow[0]);
        return null;
    }

    return (
        countriesToShow.map((c) => (
            <div key={c.name.official}>
                <span>{c.name.common}   </span>
                <button onClick={() => showCountry(c)}>Show</button>
            </div>
        ))
    );
};

export default Countries;