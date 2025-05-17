const Country = ({ country }) => {

    console.log(`Rendering ${country.name.common}`);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>

            <h1>Languages</h1>
            <ul>
                {Object.values(country.languages).map(l => (
                    <li key={l}>{l}</li>
                ))}
            </ul>
            <img src={country.flags.png} />
        </div>
    )
};

export default Country;