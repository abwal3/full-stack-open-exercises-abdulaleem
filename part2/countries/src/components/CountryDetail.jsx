import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  // State to hold the weather data
  const [weather, setWeather] = useState(null)
  
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0]

  console.log('My API Key is:', import.meta.env.VITE_SOME_KEY)
  // Fetch weather data when the component mounts or the capital changes
  useEffect(() => {
    if (capital) {
      const api_key = import.meta.env.VITE_SOME_KEY
      // The metric unit flag gives us Celsius and meters/sec
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.log('Error fetching weather:', error))
    }
  }, [capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px', marginTop: '20px' }} 
      />

      {/* Conditionally render the weather section only when the data has arrived */}
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <div>temperature {weather.main.temp} Celcius</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

export default CountryDetail