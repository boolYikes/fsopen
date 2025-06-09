import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notifyCreateAction } from "../reducers/notificationReducer"
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
    // plus, it doesn't touch the immutable
    const filteredAnecdotes = useMemo(() => {
        return (anecdotes
            .filter(anecdote => anecdote.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
        )
    }, [anecdotes, filter])

    return (
        <ul style={{ listStyle: 'circle' }}>
            {filteredAnecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(notifyCreateAction(`Voted for ${anecdote.id}`, 5000))
                    }}
                />
            )}
        </ul>
    )
}

export default AnecdoteList