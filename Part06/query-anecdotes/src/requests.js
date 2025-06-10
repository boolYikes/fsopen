import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const wrongUrl = 'http://localhost:3001/anecdotess'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const errorPageTest = () => 
    axios.get(wrongUrl).then(res => res.data)

export const addAnecdote = newOne =>
    axios.post(baseUrl, newOne).then(res => res.data)

export const vote = target =>
    axios.put(`${baseUrl}/${target.id}`, target).then(res => res.data)