const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
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
    const c = byb.length
    response.send(`<p>Phonebook has info for ${c} people</p>
                   <p>${d}</p>`)
})
// Database query
app.get("/api/persons", (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete({_id:request.params.id}).then(person => {
        console.log(`whadaya return ${person}`)
        response.status(204).end()
    })
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body.content)
    // isn't it better to handle empty input from the frontend?
    if (body.name === undefined || body.number === undefined){
        return response.status(400).json({
            error: 'No content'
        })
    }
    Person.findById(request.params.id).then(person => {
        if (person === undefined){
            return response.status(409).json({
                error: 'The name already exists'
            })
        }else{
            const person = new Person({
                name : body.name,
                number : body.number,
            })
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'UNKNOWN ENDPOINT'})
}
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})