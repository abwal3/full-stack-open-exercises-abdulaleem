const Search = ({ countrySearch, handleCountrySearch }) => {

    return (
        <>
            Search countries  <input value={countrySearch} onChange={handleCountrySearch} />
        </>
    )
}

export default Search