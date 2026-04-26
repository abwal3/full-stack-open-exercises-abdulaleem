import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const duplicatedName = (nameToCheck, personsArray) => {
  if (personsArray.some((person) => person.name === nameToCheck)) {
    alert(`${nameToCheck} is already added to phonebook`)
    return true
  }
  return false
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  
  const [nameFilter, setNameFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if (duplicatedName(newName, persons)) return

    setPersons(persons.concat({ name: newName, number: newNum}))
    setNewName('')
    setNewNum('')
  }

  const searchByName = (name) => {
    if (name === '') return persons
    return persons.filter((person) => person.name.toLowerCase().includes(name.toLowerCase()))
  }
  
  const personsToShow = searchByName(nameFilter);

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
      
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addName} 
        newName={newName} handleNameChange={(e) => setNewName(e.target.value)} 
        newNum={newNum} handleNumChange={(e) => setNewNum(e.target.value)} 
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App