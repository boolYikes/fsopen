import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// username, name ,password
const signUp = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { getAll, signUp }
