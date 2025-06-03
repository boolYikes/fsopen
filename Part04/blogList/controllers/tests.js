const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testRouter.delete('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

// testRouter.post('/mock', async (req, res) => {
//   for (let i=1; i<4; i++) {
//     const blog = new Blog({
//       title: `yup${i}`,
//       author: "test1",
//       url: "yup.com",
//       likes: 10 * i,
//       user: "abcd123"
//     })
//     await blog.save()
//   }
//   res.status(201).json({ message: "Multiple save complete for testing!" })
// })

module.exports = testRouter