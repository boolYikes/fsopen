const notesRouter = require('express').Router()
const Note = require('../models/note')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// nexts and try-catch are not needed cuz of the express-async-errors lib

const getTokenFrom = req => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
}

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
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SEKRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    // console.log(`decoded token: ${decodedToken}`)
    const user = await User.findById(decodedToken.id)
    // const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        user: user.id
    })
    const savedNote = await note.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote) // 201 stands for CREATED
})
// temp router for resetting
// notesRouter.delete('/', async (req, res) => {
//     await Note.deleteMany({})
//     res.status(204).end()
// })

module.exports = notesRouter