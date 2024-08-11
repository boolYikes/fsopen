const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const path = require('path')
const favicon = require('serve-favicon')
const { error, assert } = require('console')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
// I hated seeing 404 in console every new load!
app.use(favicon(path.join(__dirname, '', 'favicon.ico')))
morgan.token('content', (req, res) => {
    const bd = JSON.stringify(req.body)
    return bd
})
app.use(morgan((tokens, req, res) => {
    return [
        'LOG: ',
        tokens.method(req, res),
        tokens.url(req, res),
        'HTTP/'+tokens['http-version'](req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms',
        '\nCONTENT: '+tokens.content(req, res),
        '\nTIME: '+tokens.date(req, res)
    ].join(' ') // is it printing twice cuz it has tokens for both req and res?
}))

// let byb = [
//     { 
//       id: "1",
//       name: "Arto Hellas", 
//       number: "040-123456"
//     },
//     { 
//       id: "2",
//       name: "Ada Lovelace", 
//       number: "39-44-5323523"
//     },
//     { 
//       id: "3",
//       name: "Dan Abramov", 
//       number: "12-43-234345"
//     },
//     { 
//       id: "4",
//       name: "Mary Poppendieck", 
//       number: "39-23-6423122"
//     }
// ]

// Almost obsolete urls
app.get("/", (request, response) => {
    // console.log(request.headers)
    response.send("<h1 style='color:salmon'>DEFAULT PAGE</h1>")
})
app.get("/info", (request, response) => {
    const formats = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'long',
        timeZone: 'UTC'
    }
    const d = new Date().toLocaleString('en-US', formats)
    Person.find({})
        .then(p => {
            response.send(`<p>Phonebook has info for <strong style="color:salmon">${p.length}</strong> people</p>
                           <p>, as of <strong style="color:darkgreen">${d}</strong></p>`)
        })
})
// Database query
app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then(p => {
            response.json(p)
        })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person){
                response.json(person)
            }else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(`deleting returns ${result}`)
            response.status(204).end()
        })
        .catch(error => next(error))
})
app.post('/api/persons', (request, response, next) => {
    const {name, number} = request.body
    // isn't it better to handle empty input from the frontend?
    if (name === undefined || number === undefined){
        return response.status(400).json({
            error: 'No content'
        })
    }
    // post router no longer needs if-exist logic now that there's a PUT router
    const person = new Person({
        name : name,
        number : number,
    })
    person.save()
        .then(savedPerson => {
        response.json(savedPerson)
        })
        .catch((error) => {
            if (error.name === 'ValidationError'){
                const mssg = error.message.split("!!")[1]
                const err = new Error(mssg)
                err.status = 400
                error = err
            }
            next(error)
        })
})
// The if-exist-update logic is already handled by the frontend. I need a put router
app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
    Person.findByIdAndUpdate(
        request.params.id, 
        {name, number}, 
        {new: true, runValidators: true, context: 'query'}
    )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// Error handlers
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'UNKNOWN ENDPOINT'})
}
app.use(unknownEndpoint)
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError'){
        return res.status(400).send({error: 'Malformed ID'})
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})