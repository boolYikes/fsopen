const Note = require('../models/note')

const initNotes = [
    { content: 'HTML is easay', important:false },
    { content: 'Instructions on Mongo.js is unclear', important:true }
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()
    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initNotes, nonExistingId, notesInDb
}