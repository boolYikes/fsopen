const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
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