import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import { useNotiDispatch } from "../NotiContext"

const AnecdoteForm = () => {
  
  const notiDispatcher = useNotiDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: addAnecdote,
    onSuccess: async (newOne) => { // newOne is returned by addAnecdote
      const anecdotes = queryClient.getQueryData(['anecdotes']) // refreshes fronted
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newOne)) // cache update, manually
      
      // toast
      notiDispatcher({ type: 'add' })
      setTimeout(() => notiDispatcher({ type: 'remove' }), 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { 
        content,
        id: Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0'),
        votes: 0
      },
      {
        onError: (error) => {
          // error toast
          notiDispatcher({ type: "error", payload: `error: ${error.message}` })
          setTimeout(() => notiDispatcher({ type: 'remove' }), 5000)
        }
      }
    )
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />{' '}
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
