const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
const url = process.env.URI
mongoose.connect(url)
    .then(res => {
        console.log(`Conn established: ${res}`) // just wanted to see what it returns
    })
    .catch(err => {
        console.log(`Conn error: ${err}`)
    })
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        console.log(`this is not used: ${document}`)
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)