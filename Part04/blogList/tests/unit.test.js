const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const test_blogs = [
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
        title: 'Test1 title',
        author: 'Test1',
        url: 'https://test.url',
        likes: 11,
        __v: 0
    },
    {
        _id: '7a422aa71b54a676234d17f8',
        title: 'Test2 title',
        author: 'Test2',
        url: 'https://test2.url',
        likes: 8,
        __v: 0
    },
    {
        _id: '8a422aa71b54a676234d17f8',
        title: 'Test3 title',
        author: 'Test2',
        url: 'https://test2.url',
        likes: 7,
        __v: 0
    }
]
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
    test('Zero element -> returns zero', () => {
        assert.strictEqual(listHelper.totalLikes(blogs0), 0)
    })
    test('Only one element -> return its likes straight up', () => {
        assert.strictEqual(listHelper.totalLikes(blogs1), 5)
    })
    test('Multiple elements -> return the sum proper', () => {
        assert.strictEqual(listHelper.totalLikes(test_blogs), 31)
    })
})

describe('Favorite blog', () => {
    test('The most loved blog is...', () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog(test_blogs),
            {
                _id: '6a422aa71b54a676234d17f8',
                title: 'Test1 title',
                author: 'Test1',
                url: 'https://test.url',
                likes: 11,
                __v: 0
            }
        )
    })
})

describe('Well endowed blog-wise', () => {
    test('The rich boi is...', () => {
        assert.deepStrictEqual(
            listHelper.mostBlogsOwned(test_blogs),
            {
                author: 'Test2',
                blogs: 2
            }
        )
    })
})

describe('Most liked author', () => {
    test('Author who has the max sum of likes', () => {
        assert.deepStrictEqual(
            listHelper.mostLikedAuthor(test_blogs),
            { author: 'Test2', likes: 15})
    })
})