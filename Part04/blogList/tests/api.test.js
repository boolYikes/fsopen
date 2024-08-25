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
    // const blogObjs = helper.test_blogs
    //     // why did new Note({note}) work before? it doesn't work with brackets here!?
    //     .map(blog => new Blog(blog)) 
    // // console.log(blogObjs[0])
    // const blogPromises = blogObjs
    //     .map(blog => blog.save())
    // await Promise.all(blogPromises)
    await Blog.insertMany(helper.test_blogs)
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
test('"likes" property default check', async () => {
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
test('Bad request for no title and url', async () => {
    const testPosts = [
        {
            author: 'Tuna',
            likes: 2
        },
        {
            title: 'No url',
            author: 'Tuna',
            likes: 1
        },
        {
            url: 'http://notitle.org',
            author: 'Tuna',
        }
    ]
    const testPromises = testPosts.map(async (post) => {
        await api
            .post('/api/blogs')
            .send(post)
            .expect(400)
    })
    await Promise.all(testPromises)
    
    const currentBlogs = await helper.getAllBlogs()
    assert.strictEqual(currentBlogs.length, helper.test_blogs.length)
})
test('Delete test', async () => {
    const initBlog = await helper.getAllBlogs()
    const target = initBlog[0]
    console.log(target)
    await api
        .delete(`/api/blogs/${target.id}`)
        .expect(204)
    const aftermath = await helper.getAllBlogs()
    console.log(aftermath)
    const titles = aftermath.map(b => b.title)
    assert(!titles.includes(target.title))
    assert.strictEqual(aftermath.length, initBlog.length - 1)
})
test('Get one id', async () => {
    const initBlogs = await helper.getAllBlogs()
    const target = initBlogs[0]
    const result = await api
        .get(`/api/blogs/${target.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(result.body, target)
})
test.only('Update test', async () => {
    const initBlogs = await helper.getAllBlogs()
    const target = initBlogs[0]
    const tempBlog = new Blog({
        title: "Update test",
        author: "Update test",
        url: "https://test.update",
        likes: 567
    })
    const putResult = await api
        .put(`/api/blogs/${target.id}`)
        .send(tempBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const getResult = await api
        .get(`/api/blogs/${target.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(getResult.body, putResult.body)
})
after(async() => {
    await mongoose.connection.close()
})