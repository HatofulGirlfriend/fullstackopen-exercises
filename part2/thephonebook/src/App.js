import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [selected, setSelected] = useState(persons);
  const [newSearch, setNewSearch] = useState("");

  const hook = () => {
    console.log("effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
        setSelected(response.data)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault();

    if (doesNameExist()) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      axios
        .post("http://localhost:3001/persons", nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data));
          setSelected(persons.concat(response.data));
        })

    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNewSearch(event.target.value);
    const entriesToShow = newSearch
      ? persons.filter(person =>
        (person.name.toLowerCase().includes(event.target.value.toLowerCase())))
      : persons
     setSelected(entriesToShow);
  }

  const doesNameExist = () => {
    for (let i = 0; i < persons.length; i++) {
      if (newName.toLowerCase() === persons[i].name.toLowerCase()) {
        return true;
      }
    }
  };

  return (

    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleNameSearch={handleNameSearch} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {selected.map((person) => (
        <Persons
          key={person.id}
          personName={person.name}
          personNumber={person.number}
        />
      ))}
    </div>
  );
};

export default App;
