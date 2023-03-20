import { useState, useEffect } from "react";
import countriesService from "../services/countries"

const CountryDisplay = ({ country }) => {
const [weather, setWeather] = useState(null);

useEffect(() => {
    countriesService
      .getWeatherData(country.capital[0])
      .then(response => {
        setWeather(response)
      })
  }, [])

if (weather === null) {
    return
}

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                Capital: {country.capital} <br />
                Area: {country.area} km²
            </p>
            <h3>Languages</h3>
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
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature:{" "}{weather.current.temperature}°C</p>
                <p><img src={weather.current.weather_icons[0]}
                alt={weather.current.weather_descriptions[0]} /><br />
                wind {weather.current.wind_speed} m/s
                </p>

            </div>
        </div>
    )
}

export default CountryDisplay