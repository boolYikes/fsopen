import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { 
        content,
        id: Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0'),
        votes: 0
     }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteStuff = async (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
    return response.data
}

export default { getAll, createNew, voteStuff }