const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isValid = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && isValid)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const theTokened = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
        theTokened,
        process.env.SEKRET,
        { expiresIn: 60*60}
    )

    res
        .status(200)
        .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter