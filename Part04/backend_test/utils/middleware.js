const { response } = require('../app')
const logger = require('./logger')
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('--- --- --- ---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'UNKNOWN ENDPOINT' })
}
const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }else if (error.code === 11000) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}