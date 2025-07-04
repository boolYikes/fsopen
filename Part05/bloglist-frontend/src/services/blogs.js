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
  // console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const del = async blog => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
  }
  try {
    await axios.delete(`${baseUrl}/${blog.id}`, config)
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default { getAll, create, setToken, like, del }