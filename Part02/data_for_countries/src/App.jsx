import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Country from './components/Country'
import Profile from './components/Profile'
import Notification from './components/Notification'


const App = () => {
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
        setSearchRes([])
      }else if (filtRes.length > 1){ // 2 ~ 10 results
        setSearchRes(filtRes)
        setMessage(null)
      }else if (filtRes.length > 0){ // 1 result
        setSearchRes([])
        setMessage(null)
        axios // should i have put the data in the json server first? ...
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filtRes[0].name}`)
          .then(response => {
            const newProfile = {
              name: response.data.name.common,
              capital: response.data.capital[0],
              area: response.data.area,
              languages: response.data.languages,
              flag: response.data.flags
            }
            setProfile(newProfile)
          })
          .catch(exception => {
            console.log(exception)
          })
      }else{ // no result
        const newMessage = {
          text: 'No matches found.',
          type: 'error'
        }
        setSearchRes([])
        setMessage(newMessage)
      }
    }else{
      setSearchRes([])
    }
  }

  return (
    <div>
      <strong>find countries</strong> <input placeholder='enter search keyword' value={searchKW} onChange={onSearchfieldChange}/>
      <Notification message={message}/>
      <Profile country={profile}/>
      <ul>{searchRes.map(country => 
        <Country key={country.id} name={country.name}/>
      )}
      </ul>
    </div>
  )
}

export default App
