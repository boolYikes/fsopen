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
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        // console.log(request.params.id)
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => {
        // console.log(error)
        // response.status(400).send({error: 'malformatted ID'})
        next(error)
    })
})
app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
// update importance
app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important,
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})
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
    // no next method cuz no more middleware? EDIT: NOPE It simply doesn't need it
}
app.use(unknownEndpoint)
// handle error
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return express.response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001 // this is for deploying on host services
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})