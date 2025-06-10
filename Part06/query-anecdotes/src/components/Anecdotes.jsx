import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote, errorPageTest } from '../requests'

const Anecdote = ({ target }) => {

    const queryClient = useQueryClient()
    const voteMutation = useMutation({
        mutationFn: vote,
        onSuccess: (voteResult) => {
            const anecdotes = queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            queryClient.setQueryData(
                ['anecdotes'], 
                anecdotes.map((anecdote => {
                    anecdote.id === voteResult.id
                    ? {...anecdote, votes: voteResult.votes }
                    : anecdote
                }))
            )
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    }

    return (
        <div style={{ borderBottom: '1px solid black', padding: '0.3rem', marginTop: '5px', marginBottom: '2px' }}>
            <div>
                {target.content}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
                has {target.votes} {' '}
                <button onClick={() => handleVote(target)}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: false
    })

    if (result.isLoading) {
        return <div>Loading data ... </div>
    } 
    
    if (result.isError) {
        return <div>{result.error.message}</div>
    }

    const anecdotes = result.data

    return (
        <div style={{ marginTop: '1.5rem' }}>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} target={anecdote} />
            )}
      </div>
    )
}

export default Anecdotes