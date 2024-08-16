const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('and returns 1', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const blogs0 = []
    const blogs1 = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]
    const blogs2 = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '6a422aa71b54a676234d17f8',
            title: 'Test title',
            author: 'Test author',
            url: 'https://test.url',
            likes: 11,
            __v: 0
        }
    ]
    test('Zero element -> returns zero', () => {
        assert.strictEqual(listHelper.totalLikes(blogs0), 0)
    })
    test('Only one element -> return its likes straight up', () => {
        assert.strictEqual(listHelper.totalLikes(blogs1), 5)
    })
    test('Multiple elements -> return the sum proper', () => {
        assert.strictEqual(listHelper.totalLikes(blogs2), 16)
    })
})

test('The most loved blog.', () => {
    const blogs2 = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '6a422aa71b54a676234d17f8',
            title: 'Test title',
            author: 'Test author',
            url: 'https://test.url',
            likes: 11,
            __v: 0
        },
        {
            _id: '7a422aa71b54a676234d17f8',
            title: 'Test2 title',
            author: 'Test2 author',
            url: 'https://test2.url',
            likes: 8,
            __v: 0
        }
    ]
    assert.deepStrictEqual(
        listHelper.favoriteBlog(blogs2),
        {
            _id: '6a422aa71b54a676234d17f8',
            title: 'Test title',
            author: 'Test author',
            url: 'https://test.url',
            likes: 11,
            __v: 0
        }
    )
})