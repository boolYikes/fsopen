import { useState } from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { notifyCreateAction } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const [textContent, setTextContent] = useState('')
    const dispatch = useDispatch()
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const trimmedText = textContent.trim()
        if (trimmedText) {
            dispatch(addAnecdote(trimmedText))
            dispatch(notifyCreateAction('Anecdote added!!', 5000))
            event.target.entry.value = ''
            setTextContent('')
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