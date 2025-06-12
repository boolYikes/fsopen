import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
    return {
        type,
        name: 'search',
        value,
        onChange: (e) => setValue(e.target.value),
        onReset: () => setValue('')
    }
}

// null on landing, found false on 404, found true on data return
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (!name) {
            setCountry(null)
            return
        }

        const fetch = async () => {
            try {
                const enc = encodeURIComponent(name)
                const result = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${enc}?fullText=true`)
                setCountry({ found: true, data: result.data })
            } catch (err) {
                setCountry({ found: false })
            }
        }

        fetch()
    }, [name])
    
    return country
}