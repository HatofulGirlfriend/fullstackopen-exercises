import { useState, useEffect } from "react";
import countriesService from "./services/countries"
import Search from "./components/Search";
import CountrySearchList from "./components/CountrySearchList";
import CountryDisplay from "./components/CountryDisplay";

const App = () => {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState("");
const [selected, setSelected] = useState(countries);


useEffect(() => {
  countriesService
    .getAll()
    .then(response => {
      setCountries(response)
    })
}, [])


const handleNameSearch = (newSearch) => {
  setSearch(newSearch);
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  })
    setSelected(filteredCountries);
}

const buttonCountryShortcut = (country) => {
 setSelected([country])
}


  return (
    <>
      <div>
        <Search newSearch={search} handleNameSearch={handleNameSearch} />
      </div>
      {selected.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }
      {selected.length > 1 && selected.length <= 10 &&
        selected.map((country) => (
          <div key={country.name.common}>
          <CountrySearchList country={country}
           buttonOnClick={buttonCountryShortcut} />
          </div>
        ))
      }
      {selected.length === 1 &&
        <CountryDisplay country={selected[0]} />
      }

    </>
  )
}


export default App;