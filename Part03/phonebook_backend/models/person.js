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
    name: {
        type: String,
        minLength: [3, '!!Username must be longer than 3 characters'],
        required: [true, 'Cannot be empty']
    },
    number: {
        type: String,
        validate:{
            validator: (v) => {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `!!Invalid number: ${props.value}. Correct format: xxx-xxxxx, xx-xxx`
        },
        required: [true, 'Cannot be empty']
    }
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