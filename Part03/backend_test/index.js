const express = require('express')
const app = express()
app.use(express.static('dist')) // I'm still not sure why we need this... index.html?
app.use(express.json())
const Note = require('./models/note')
// course material doesn't mention this but it doesn't work without this line
require('dotenv').config() 

const mongoose = require('mongoose')

const cors = require('cors')
app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('--- --- --- ---')
    next()
}
app.use(requestLogger)
// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello Warudo!!</h1>')
})
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => { // using mongoose to fetch from db
        response.json(notes)
    })
})
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})
// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => Number(n.id)))
//         : 0
//     return String(maxId + 1)
// }
app.post(`/api/notes`, (request, response) => {
    const body = request.body
    
    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

// handle non-exsistant route with middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'UNKNOWN ENDPOINT'})
    // no next method cuz no more middleware?
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001 // this is for deploying on host services
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})