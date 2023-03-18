import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [selected, setSelected] = useState(persons);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setSelected(initialPersons)
      })
  }, [])

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
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSelected(persons.concat(returnedPerson))
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


  const deletePerson = (idToDelete, personToDelete) => {
    if (window.confirm(`Delete ${personToDelete}?`)) {
      personService
        .remove(idToDelete)
        .then(() => {
          setSelected(persons.filter(p => p.id !== idToDelete))
        })
    }
  }

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
          handleDeletePersons={deletePerson}
          id={person.id}
        />
      ))}
    </div>
  );
};

export default App;
