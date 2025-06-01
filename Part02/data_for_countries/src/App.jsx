import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Country from './components/Country'
import Profile from './components/Profile'
import Notification from './components/Notification'

const App = () => {
  const api_key = import.meta.env.VITE_WEATHERMAP_KEY
  const [countries, setCountries] = useState([])
  const [searchKW, setSearchKW] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [message, setMessage] = useState(null)
  const [profile, setProfile] = useState(null)

  // get all init
  const hook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const result = response['data'].map((country, i) => ({'id':i, 'name':country['name']['common']}))
        setCountries(result)
        // console.log(result)
      })
  }
  useEffect(hook, [])

  const onSearchfieldChange = (event) => {
    const kw = event.target.value
    setSearchKW(kw)
    const filtRes = countries.filter(country => country.name.toLowerCase().includes(kw))
    if (kw){
      if (filtRes.length > 10){ // bigger than 10
        const newMessage = {
          text: 'TELL ME MORE',
          type: 'error'
        }
        setMessage(newMessage)
        setProfile(null)
        setSearchRes([])
      }else if (filtRes.length > 1){ // 2 ~ 10 results
        setSearchRes(filtRes)
        setProfile(null)
        setMessage(null)
      }else if (filtRes.length > 0){ // 1 result
        showInfo(filtRes[0].name)
      }else{ // no result
        const newMessage = {
          text: 'No matches found.',
          type: 'error'
        }
        setSearchRes([])
        setProfile(null)
        setMessage(newMessage)
      }
    }else{
      setSearchRes([])
    }
  }
  const showInfo = (name) => {
    setSearchRes([])
    setMessage(null)
    axios // should i have put the data in the json server first? ...
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(countryResponse => {
        const lat = countryResponse.data.latlng[0]
        const lon = countryResponse.data.latlng[1]
        // console.log(api_key)
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(weatherResponse => {
          const newProfile = {
            name: countryResponse.data.name.common,
            capital: countryResponse.data.capital[0],
            area: countryResponse.data.area,
            languages: countryResponse.data.languages,
            flag: countryResponse.data.flags,
            temperature: weatherResponse.data.main.temp,
            icon: weatherResponse.data.weather[0].icon,
            wind: weatherResponse.data.wind.speed
          }
          // console.log(response.data)
          setProfile(newProfile)
          })
      })
      .catch(exception => {
        console.log(exception)
      })
  }

  return (
    <div>
      <strong>find countries</strong> <input placeholder='enter search keyword' value={searchKW} onChange={onSearchfieldChange}/>
      <Notification message={message}/>
      <Profile country={profile}/>
      <ul>{searchRes.map(country => 
        <Country key={country.id} name={country.name} handleShowButton={()=>showInfo(country.name)}/>
      )}
      </ul>
    </div>
  )
}

export default App
