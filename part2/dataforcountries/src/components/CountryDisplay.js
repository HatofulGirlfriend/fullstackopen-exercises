const CountryDisplay = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                Capital: {country.capital} <br />
                Area: {country.area} km²
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.keys(country.languages).map((languageKey) => (
                    <li key={languageKey}>{country.languages[languageKey]}</li>
                ))}
            </ul>
            <p>
                <img
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    style={{ width: 200, border: "2px solid black" }}
                />
            </p>
        </div>
    )
}

export default CountryDisplay