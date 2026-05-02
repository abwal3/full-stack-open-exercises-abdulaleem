import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import duplicatedName from './components/duplicated'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response)
        setPersons(response)
      })
  }, [])


  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  
  const [nameFilter, setNameFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const duplicateCheck = duplicatedName(newName, persons)
    
    if (duplicateCheck.isDuplicate) {
      if (duplicateCheck.wantsToUpdate) {
        const personObject = {
          name: newName,
          number: newNum
        }
        const idToUpdate = duplicateCheck.person.id
        
        personService
          .update(idToUpdate, personObject)
          .then((response) => {
            console.log(response)
            setPersons(persons.map((person) => person.id !== idToUpdate ? person : response))
            setNewName('')
            setNewNum('')
          })
      }
      return 
    }

    const personObject = {
      name: newName,
      number: newNum
    }
    personService
      .create(personObject)
      .then((response) => {
        console.log(response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNum('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App