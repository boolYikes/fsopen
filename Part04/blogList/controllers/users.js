const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body
    if (password === undefined || password === null) {
        return res.status(400).json({ error: 'Invalid password'})
    } else if (password.length <= 3) {
        return res.status(400).json({ error: 'Password length too short'})
    }
    const salt = 3
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({
        username,
        name,
        passwordHash
    })
        const savedUser = await user.save()
        res.status(201).json(savedUser)
})
// usersRouter.delete('/', async (req, res) => {
//     if (process.env.NODE_ENV === 'test') {
//         await User.deleteMany({})
//         res.status(204).end()
//     }
// })
usersRouter.get('/', async (req, res, next) => {
    const allUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    res.json(allUsers)
})
usersRouter.put('/:id', async (req, res) => {
    const { username, name, password, blogs } = req.body
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { username, name, password, blogs },
        { new: true, runValidators: true, context: 'query' }
    )
    res.json(updated)
})

module.exports = usersRouter