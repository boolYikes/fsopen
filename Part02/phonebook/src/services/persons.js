import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"
const selectAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const insert = (obj) => {
    const request = axios.post(baseUrl, obj)
    return request.then(response => response.data)
}
const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
const update = (obj) => {
    const request = axios.put(`${baseUrl}/${obj.id}`, obj)
    return request.then(response => response.data)
}
export default{
    selectAll: selectAll,
    insert: insert,
    del: del,
    update: update
}