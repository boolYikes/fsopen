const logger = require('./logger')
const requestLogger = (request, response, next) => {
    logger.log('Method:', request.method)
    logger.log('Path:', request.path)
    logger.log('Body:', request.body)
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
    }
    next(err)
}
module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler
}