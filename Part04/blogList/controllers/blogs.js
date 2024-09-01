const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    res.json(blogs)
})
blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})
blogsRouter.post('/', async (req, res, next) => {
    try {
        req.body.user = "66d2d78f8a8db2689a9e6b69"
        const blog = new Blog(req.body)
        const savedBlog = await blog.save()
        savedBlog.populate('user', { username: 1, name: 1 })
        res.status(201).json(savedBlog)
    } catch (e) {
        next(e)
    }
})
blogsRouter.delete('/', async (req, res) => {
    await Blog.deleteMany({})
    res.status(204).end()
})
blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})
blogsRouter.put('/:id', async (req, res, next) => {
    const { title, author, likes, url } = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, author, likes, url },
        { new: true, runValidators: true, context: 'query'}
    )
    res.json(updatedBlog)
})

module.exports = blogsRouter