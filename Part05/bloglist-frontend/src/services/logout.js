import axios from 'axios'
const baseUrl = '/api/logout'

const logout = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { logout }