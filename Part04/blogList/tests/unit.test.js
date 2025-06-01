const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')

test('Dummy returns 1', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})
describe('Total likes', () => {
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
    test('Zero element -> returned zero', () => {
        assert.strictEqual(listHelper.totalLikes(blogs0), 0)
    })
    test('Only one element -> returned its likes straight up', () => {
        assert.strictEqual(listHelper.totalLikes(blogs1), 5)
    })
    test('Multiple elements -> returned the sum proper', () => {
        assert.strictEqual(listHelper.totalLikes(listHelper.test_blogs), 31)
    })
})
describe('Favorite blog', () => {
    test('the most loved blog', () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog(listHelper.test_blogs),
            {
                title: 'Test1 title',
                author: 'Test1',
                url: 'https://test.url',
                likes: 11,
            }
        )
    })
})
describe('Well endowed blog-wise', () => {
    test('the rich boi', () => {
        assert.deepStrictEqual(
            listHelper.mostBlogsOwned(listHelper.test_blogs),
            {
                author: 'Test2',
                blogs: 2
            }
        )
    })
})
describe('Most liked author', () => {
    test('author with max likes check', () => {
        assert.deepStrictEqual(
            listHelper.mostLikedAuthor(listHelper.test_blogs),
            { author: 'Test2', likes: 15})
    })
})