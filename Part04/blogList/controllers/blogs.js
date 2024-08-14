const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
            logger.log(`n x blogs: ${blogs.length}`)
        })
})
blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)
    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter