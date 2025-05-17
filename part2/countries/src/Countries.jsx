import Country from "./Country.jsx";

const Countries = ({ countries, search }) => {
    console.log(search);
    
    if (search === '') {
        return;
    }

    search = search.toLowerCase();

    const countriesToShow = countries.filter(c => 
        c.name.common.toLowerCase().includes(search) || 
        c.name.official.toLowerCase().includes(search))
    
    if (countriesToShow.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]

        return (
            <Country country={country} />
        )
    }

    return (
        countriesToShow.map((c) => (
            <div key={c.name.official}>{c.name.common}</div>
        ))
    );
};

export default Countries;