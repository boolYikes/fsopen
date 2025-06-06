import { useState } from "react"
import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const [textContent, setTextContent] = useState('')
    const dispatch = useDispatch()
    
    const handleSubmit = (event) => {
        event.preventDefault()

        const trimmedText = textContent.trim()
        if (trimmedText) {
            setTextContent('')
            dispatch(add(trimmedText))
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <h2>create new</h2>
            <input
                type="text"
                placeholder="say something"
                name="entry"
                onChange={(event) => setTextContent(event.target.value)}
                required
            />
            <button type="submit" style={{ marginLeft: '0.5rem' }}>add</button>
        </form>
    )
}

export default AnecdoteForm