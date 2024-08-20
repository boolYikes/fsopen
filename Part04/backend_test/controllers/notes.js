const notesRouter = require('express').Router()
const Note = require('../models/note')
// nexts and try-catch are not needed cuz of the express-async-errors lib

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})
notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
// update importance
notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body
    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' } // the implicit method
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})
notesRouter.post('/', async (request, response) => {
    const body = request.body
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    const savedNote = await note.save()
    response.status(201).json(savedNote) // 201 stands for CREATED
})

module.exports = notesRouter