import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

export default { getAll }