import { useState } from 'react'

const Person = ({ personName }) => {
  return (
    <div>{personName}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    if (doesNameExist) {
      alert(`${newName} is already added to the phonebook`)
    }


    setPersons(persons.concat(nameObject))
    setNewName("")

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const doesNameExist = () => {
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        return true
      }
    }
  }
 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.id} personName={person.name} />
        )}
    </div>
  )
}

export default App