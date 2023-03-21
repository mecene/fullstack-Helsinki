import Filter from "./components/Filter";
import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [countries, SetCOuntries] = useState(null)
  const [search, setSearch] = useState('')
  //const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  //const [searchedCountries, setSearchedCountries] = useState([])

  const baseUrl = "https://restcountries.com/v3.1/all"
  const baseUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}` //&q=London


  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => SetCOuntries(response.data))
      .catch(error => {
        console.log('Failed to load ressources')
      })
  }, []);

  // call to the weather app based on country capital
  const CityWeather = ({ cityUrl }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
      if (cityUrl) {
        console.log(cityUrl)
        axios
          .get(cityUrl)
          .then(response => setWeather(response.data))
          .catch(error => {
            console.log('Failed to load weather ressources')
          })
      }
    }, [])
    //console.log(new Date().getSeconds());
    if (weather) {
      //console.log(weather);
      return (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`weather in ${weather.name}`}/>
          <p>wind {weather.wind.speed}</p>

        </div>
      )
    }
  }


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
      // return the details of country and weather for capital
      if (searchLength === 1) {
        return (
          countriesToShow.map((country, index) =>
            <div key={index}>
              <h2> {country.name.common} </h2>
              <p>Capital : {`${country.capital}`}</p>
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
              <CityWeather cityUrl={`${baseUrlWeather}&q=${country.capital}`} />
            </div>

          )
        )
      }
      // return the list of countries < 10 > 1 results with a button to select it
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
