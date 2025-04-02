import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl, blog, config)
  return response.data
}

export default { getAll, create, setToken, like }