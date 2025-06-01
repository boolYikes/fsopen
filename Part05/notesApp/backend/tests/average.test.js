const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/unit_test').average

describe('average', () => {
    test('of one val is the val itself.', () => {
        assert.strictEqual(average([1]), 1)
    })
    test('of multiple vals is sum of vals / num of vals.', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
    })
    test('of no val is zero.', () => {
        assert.strictEqual(average([]), 0)
    })
})