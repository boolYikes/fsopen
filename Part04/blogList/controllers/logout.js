const logoutRouter = require('express').Router()

logoutRouter.get('/', async (req, res, next) => {
    let token = null
    res
        .status(204)
        .json({ token, username: null, name: null })
})

module.exports = logoutRouter