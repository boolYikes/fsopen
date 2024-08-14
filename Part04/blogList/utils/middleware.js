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
    res.status(400).send(`Error handle: ${err}`)
}
module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler
}