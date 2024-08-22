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
test('id field as "id" check', async () => {
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
test('add post check', async () => {
    const testPost = {
        title: 'Add post test',
        author: 'Tuna',
        url: 'https://dees.kr',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .send(testPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const currentPosts = await helper.getAllBlogs()
    assert.strictEqual(currentPosts.length, helper.test_blogs.length + 1)
    const lastPost = currentPosts[currentPosts.length - 1]
    const content = {
        title: lastPost.title,
        author: lastPost.author,
        url: lastPost.url,
        likes: lastPost.likes
    }
    assert.deepStrictEqual(content, testPost)
})
test.only('"likes" property default check', async () => {
    const testPost = {
        title: "This is missing likes prop",
        author: "Sloppy doug",
        url: "http://dontlivelikeme.com"
    }
    await api
        .post("/api/blogs")
        .send(testPost)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    const currentBlogs = await helper.getAllBlogs()
    // console.log(currentBlogs[currentBlogs.length - 1])
    assert.strictEqual(currentBlogs[currentBlogs.length - 1].likes, 0)
})

after(async() => {
    await mongoose.connection.close()
})