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
usersRouter.get('/', async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

module.exports = usersRouter