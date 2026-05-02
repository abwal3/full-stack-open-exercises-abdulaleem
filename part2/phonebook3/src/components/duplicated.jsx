const duplicatedName = (nameToCheck, personsArray) => {
  const existingPerson = personsArray.find((person) => person.name === nameToCheck)
  
  if (existingPerson) {
    const wantsToUpdate = window.confirm(`${nameToCheck} is already added to phonebook, replace old number with new one?`)
    return { isDuplicate: true, wantsToUpdate, person: existingPerson }
  }

  return { isDuplicate: false }
}

export default duplicatedName