const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        res.json(blogs)
})
blogsRouter.post('/', async (req, res, next) => {
    try {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter