const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./list_helper')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = helper.test_blogs
        .map(blog => new Blog({ blog }))
    const blogPromises = blogObjs
        .map(blog => blog.save())
    await Promise.all(blogPromises)
})

test.only('total length of posts check', async () => {
    const allBlogs = await api.get('/api/blogs')
    assert.strictEqual(allBlogs.body.length, helper.test_blogs.length)
})

after(async() => {
    await mongoose.connection.close()
})