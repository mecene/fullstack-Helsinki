import Filter from "./components/Filter";
import axios from "axios"
import { useEffect, useState } from "react"



function App() {

  const [countries, SetCOuntries] = useState(null)
  const [search, setSearch] = useState('')
  //const [searchedCountries, setSearchedCountries] = useState([])

  const baseUrl = "https://restcountries.com/v3.1/all"


  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => SetCOuntries(response.data))
      .catch(error => {
        console.log('Failed to load ressources')
      })
  }, [search]);




  // set the state of search to the input value (lower case)
  const handleChange = (e) => setSearch(e.target.value.toLowerCase())
  // retrieve the input tag from DOM 
  const searchInput = document.getElementsByTagName('input')
  // update search state value && insert value to input
  const handleClick = (countryName) => {
    setSearch(countryName.toLowerCase())
    searchInput[0].value = countryName
  }

  //conditionel of collection to show if searched
  const countriesToShow = search.length > 0
    ? countries.filter(country => country.name.common.toLowerCase().includes(search))
    : countries



  if (countries) {

    let searchLength = countriesToShow.length

    const Country = () => {
      if (searchLength > 10) {
        return ' Too many results'
      }
      if (searchLength === 1) {
        return (
          countriesToShow.map((country, index) =>
            <div key={index}>
              <h2> {country.name.common} </h2>
              <p>Capital : {country.capital}</p>
              <p>Area : {country.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(country.languages).map((value, index) => (
                  <li key={index}>
                    {value}
                  </li>
                )
                )}
              </ul>
              <img src={country.flags.png} alt={country.flag} />
            </div>
          )
        )
      }

      return (
        //console.log(countriesToShow)
        <ul>
          {countriesToShow.map((country, index) =>
            <li key={index}>
              {country.name.common}
              <button onClick={() => handleClick(country.name.common)}>show</button>
            </li>

          )}
        </ul>
      )
    }





    return (
      <>
        <Filter handleChange={handleChange} />
        <Country countriesToShow={countriesToShow} />
      </>

    );

  }
}

export default App;
