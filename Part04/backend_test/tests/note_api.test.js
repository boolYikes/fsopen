const { test, after, describe, beforeEach } = require('node:test')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)

describe('Test notes\' been init.', () => {
    beforeEach(async() => {
        await Note.deleteMany({})
        // const noteObjs = helper.initNotes
        //     .map(note => new Note(note)) // now it works with just "note", not "{note}" unlike before...
        // const noteSavePromises = noteObjs
        //     .map(note => note.save())
        // await Promise.all(noteSavePromises) // prevents async overtakes within a loop
        // // OR
        await Note.insertMany(helper.initNotes)
    })
    describe('Get tests', () => {
        test('Notes are returned as JSON', async() => {
            await api
                .get('/api/notes')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('Get all -> 2 notes', async() => {
            const res = await api.get('/api/notes')
            assert.strictEqual(res.body.length, helper.initNotes.length)
        })
        test('1st note content', async() => {
            const res = await api.get('/api/notes')
            const contents = res.body.map(e => e.content)
            assert(contents.includes('HTML is easay'))
        })
    })
    describe('Specific notes', () => {
        test('Get note by id', async() => {
            const notesAtStart = await helper.notesInDb()
        
            const noteToView = notesAtStart[0]
        
            const queryResult = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
            assert.deepStrictEqual(queryResult.body, noteToView)
        })
        test('Status 404 for non-existant id', async () => {
            const mythId = await helper.nonExistingId()
            await api
                .get(`/api/notes/${mythId}`)
                .expect(404)
        })
        test('Status 400 for non-valid id', async () => {
            const invalidId = 'ZZZZZZZZZZ0000'
            await api
                .get(`/api/notes/${invalidId}`)
                .expect(400)
        })
    })
    describe('Add record tests', () => {
        test('A valid note can be added?', async() => {
            const newNote = {
                content: 'async/await is da way',
                important: true,
            }
            await api
                .post('/api/notes')
                .send(newNote)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const notesAtEnd = await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length, helper.initNotes.length + 1)
        
            const contents = notesAtEnd.map(n => n.content)
            assert(contents.includes('async/await is da way'))
        })
        test('Status 400 for schema criteria not met.', async() => {
            const newNote = {
                important: true
            }
            await api
                .post('/api/notes')
                .send(newNote)
                .expect(400)
        
            const notesAtEnd = await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length, helper.initNotes.length)
        })
    })
    describe('Delete test', () => {
        test('Deletion confirmed', async () => {
            const notesAtStart = await helper.notesInDb()
            const noteToDelete = notesAtStart[0]
        
            await api
                .delete(`/api/notes/${noteToDelete.id}`)
                .expect(204)
        
            const notesAtEnd = await helper.notesInDb()
            console.log(notesAtEnd)
            const contents = notesAtEnd.map(r => r.content)
            assert(!contents.includes(noteToDelete.content))
            console.log('init length:', helper.initNotes.length)
            assert.strictEqual(notesAtEnd.length, helper.initNotes.length - 1)
        })
    })
})

after(async() => {
    await mongoose.connection.close()
})