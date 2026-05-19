import CountryDetail from "./CountryDetail"

const Content = ({ countries, selectedCountry, setSelectedCountry }) => {
  // 1. If a user clicked "show" on a country, display its details immediately
  if (selectedCountry) {
    return <CountryDetail country={selectedCountry} />
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  // 2. Add a button next to each country item in the list
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return <p>No matches found</p>
}

export default Content