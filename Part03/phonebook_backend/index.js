const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
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

let byb = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    // console.log(request.headers)
    response.send("<h1 style='color:salmon'>DEFAULT PAGE</h1>")
})
app.get("/api/persons", (request, response) => {
    response.json(byb)
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
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const target = byb.find(person => person.id === id)
    if (target) {
        response.json(target)
    }else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    byb = byb.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body.content)
    if (!body.name || !body.number){
        return response.status(404).json({
            error: 'No content'
        })
    }
    
    if (byb.filter(person => person.name === body.name).length > 0) {
        return response.status(409).json({
            error: 'The name already exists'
        })
    }
    const person = {
        id : body.name[0] + (Math.round(Math.random()*1000)).toString(),
        name : body.name,
        number : body.number,
    }

    byb = byb.concat(person)
    response.json(byb)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})