import { useField, useCountry } from './hooks'
import Country from './components/Country'
import { useState } from 'react'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null) // for submission
  const country = useCountry(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button type="submit">find</button>
        <button type="reset">reset</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App