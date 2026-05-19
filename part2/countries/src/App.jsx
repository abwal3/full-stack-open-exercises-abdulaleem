import { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Content from './components/Content.jsx'
import getCountries from './services/countries.js'



function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    getCountries.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.log("Error fetching data: ", error)
      })
  }, [])

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))



  return (
    <>
      <div>
        <Search countrySearch={countrySearch} handleCountrySearch={handleCountrySearch} />
      </div>
      <Content 
        countries={filteredCountries} 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  )
}

export default App
