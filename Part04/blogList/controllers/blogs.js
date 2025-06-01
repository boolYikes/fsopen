const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
    // auth
    const user = req.user
    const body = req.body
    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes,
        user: user._id // this is an object and it's supposed to be an object
    })
    const savedBlog = await blog.save()
    savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(savedBlog)
})
// blogsRouter.delete('/', async (req, res) => {
//     // this is for resetting db
//     await Blog.deleteMany({})
//     res.status(204).end()
// })
blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const user = req.user
    const targetBlog = await Blog.findById(req.params.id)
    const targetUserId = targetBlog.user.toString()
    // console.log(`targetblog user: ${targetUserId}, currUser: ${user._id}`)
    if (targetUserId === user._id.toString()) { // convert for hard comparison
        const deleteResult = await Blog.findByIdAndDelete(req.params.id)
        // console.log(`This was deleted: ${deleteResult}`)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'That\'s not your blog!' })
    }
})
// Not general-purpose. More like a like-handler. Is this a good practice?
blogsRouter.put('/:id', middleware.userExtractor, async (req, res, next) => {
    const user = req.user
    // const body = req.body
    // const title = body.title
    // const author = body.author
    // const url = body.url
    // const likes = body.likes
    const target = await Blog.findById(req.params.id)
    if (!target) {
        return res.status(404).json({ message: 'Blog not found' })
    }

    if (target.liked_users.includes(user.id)) {
        return res.status(400).json({ message: 'Can\'t submit duplicate likes!' })
    }

    target.liked_users.push(user.id)
    target.likes = target.likes + 1 // should i measure the length of the liked_users? wouldn't it add time complexity?
    await target.save()
    res.status(200).json(target)

    // const updatedBlog = await Blog.findByIdAndUpdate(
    //     req.params.id,
    //     { user, title, author, likes, url },
    //     { new: true, runValidators: true, context: 'query'}
    // )
})

module.exports = blogsRouter