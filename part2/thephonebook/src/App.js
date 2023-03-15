import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [selected, setSelected] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (doesNameExist()) {
      alert(`${newName} is already added to the phonebook`);
    } else setPersons(persons.concat(nameObject));
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
      if (newName === persons[i].name) {
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
