const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
    return null
}

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
blogsRouter.post('/', async (req, res) => {
    // auth
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SEKRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const body = req.body
    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(savedBlog)
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