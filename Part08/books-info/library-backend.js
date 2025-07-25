const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()
const MONGODB_URI = process.env.URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to DB')
  })
  .catch((e) => {
    console.log('❌ Error encountered connecting to DB:', e.message)
  })

// setup for subscription
const start = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SEKRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  )
}

start()

// old setup using standalone server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   debug: true,
// })

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.startsWith('Bearer ')) {
//       const decodedToken = jwt.verify(auth.substring(7), process.env.SEKRET)
//       const currentUser = await User.findById(decodedToken.id)
//       return { currentUser } // this is passed to the third param of all resolvers
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })
