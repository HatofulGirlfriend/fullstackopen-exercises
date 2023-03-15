import { useState } from "react";

const Person = ({ personName, personNumber }) => {
  return (
    <div>
      {personName} {personNumber}
    </div>
  );
};

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
      ? persons.filter(person => {
        return (
          person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
      )
      : persons
     console.log(entriesToShow)
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
      filter shown with <input value={newSearch} onChange={handleNameSearch}/>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {selected.map((person) => (
        <Person
          key={person.id}
          personName={person.name}
          personNumber={person.number}
        />
      ))}
    </div>
  );
};

export default App;
