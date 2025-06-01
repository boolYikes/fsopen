require('express-async-errors') // this goes on top or it can't catch errors
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const mongoUrl = config.URI
logger.log('Connecting to DB.')
mongoose.connect(mongoUrl)
    .then(() => {
        logger.log('DB connected.')
    })
    .catch((error) => {
        logger.error(`DB connection error: ${error}`)
    })

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.tokenExtractor) // let's log the token too
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app