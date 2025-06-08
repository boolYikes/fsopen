import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { useMemo } from "react"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li style={{ marginBottom: '1rem' }}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick} style={{ marginLeft: '0.5rem'}}>vote</button>
            </div>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    // memoize -> no rerendering -> happy browser
    const filteredAnecdotes = useMemo(() => {
        return (anecdotes.filter(anecdote => 
            anecdote.content.includes(filter)
        ))
    }, [anecdotes, filter])

    return (
        <ul>
            {filteredAnecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(vote(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList