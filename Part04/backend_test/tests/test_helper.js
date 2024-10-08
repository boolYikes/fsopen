const Note = require('../models/note')
const User = require('../models/user')

const initNotes = [
    { content: 'HTML is easay', important:false },
    { content: 'Instructions on Mongo.js is unclear', important:true }
]
const initUsers = [
    { username: 'dee', name: 'Dee', password: 'dee' },
    { username: 'test', name: 'Test', password: 'test' }
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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initNotes, initUsers, nonExistingId, notesInDb, usersInDb
}