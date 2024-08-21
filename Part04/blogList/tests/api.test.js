const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const helper = require('./list_helper')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = helper.test_blogs
        // why did new Note({note}) work before? it doesn't work with brackets here!?
        .map(blog => new Blog(blog)) 
    // console.log(blogObjs[0])
    const blogPromises = blogObjs
        .map(blog => blog.save())
    await Promise.all(blogPromises)
})

test('total length of posts check', async () => {
    const allBlogs = await api.get('/api/blogs')
    // console.log(allBlogs.body)
    assert.strictEqual(allBlogs.body.length, helper.test_blogs.length)
})
test.only('id field as "id" check', async () => {
    const allBlogs = await api.get('/api/blogs')
    const check = allBlogs.body.map(blog => {
        if ('id' in blog) {
            return true
        }
    })
    assert.strictEqual(
        check.reduce((tot, curr) => {
        return tot + curr
        }, 0)
        , helper.test_blogs.length
    )
})

after(async() => {
    await mongoose.connection.close()
})