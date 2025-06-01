const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.log('Method:', request.method)
    logger.log('Path:', request.path)
    logger.log('Body:', request.body)
    logger.log('Token:', request.token)
    logger.log('--- --- --- ---')
    next()
}
const unknownEndPoint = (req, res) => {
    res.status(404).send('<h1 style="color:salmon">NOTHING TO SEE HERE!</h1>')
}
const errorHandler = (err, req, res , next) => {
    if (err.name === 'CastError') {
        return res.status(400).send('err: Malformed ID')
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (err.code === 11000) {
        return res.status(400).json({ error: 'The username is not unique.'})
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
    } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    }
    next(err)
}
const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    // console.log(auth)
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '')
    }
    next()
}
const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SEKRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    req.user = await User.findById(decodedToken.id)
    next()
}
module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}