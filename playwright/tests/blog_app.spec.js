import { test, expect, beforeEach, describe } from '@playwright/test'
import { before } from 'node:test'

describe('Bloglist app test:', () => {
    beforeEach(async ({ page, request }) => {
        // clean up db
        await request.delete('http://localhost:3003/api/test/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'test1', 
                name: 'test1', 
                password: 'test1'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'test2', 
                name: 'test2', 
                password: 'test2'
            }
        })

        await page.goto('http://localhost:5173')
        await page.evaluate(() => localStorage.clear())
    })

    test('Login form is shown', async ({ page }) => {
    
        const loginButton = page.getByText('login')
        await expect(loginButton).toBeVisible()
        await expect(page.getByText('you shall not pass!', { exact: false })).toBeVisible()
    })

    describe('Login...', () => {
        test('...succeeds with correct credentials', async ({ page }) => {
            const inputs = await page.getByRole('textbox').all()
            await inputs[0].fill('test1')
            await inputs[1].fill('test1')
            // await page.getByRole('button', { name: '' }).click()
            await page.locator('button[type="submit"]').click()
            
            const message = page.getByText('You shall not pass!')
            // Wish the debug was prettier
            // console.log(await page.getByTestId('whole').innerHTML())
            await expect(message).toBeHidden()
        })
        
        test('...fails with wrong credentials', async ({ page }) => {
            const inputs = await page.getByRole('textbox').all()
            await inputs[0].fill('invalid')
            await inputs[1].fill('invalid')
            // await page.getByRole('button', { name: '' }).click()
            await page.locator('button[type="submit"]').click()
            
            await expect(page.getByText('You shall not pass!')).toBeVisible()

        })
    })

    describe('Test blog manipulation...', () => {
        
        beforeEach(async ({ page }) => {
            const inputs = await page.getByRole('textbox').all()
            await inputs[0].fill('test1')
            await inputs[1].fill('test1')
            await page.locator('button[type="submit"]').click()
    
            await page.getByRole('button', { name: 'create new' }).click()
            await page.getByPlaceholder('title').fill('test title')
            await page.getByPlaceholder('author').fill('test1')
            await page.getByPlaceholder('url').fill('test.com')
            await page.locator('button[type="submit"]').click()
        })

        test('...for blog creation', ({ page }) => {
            expect(page.getByText('test title by test1')).toBeDefined()
        })

        test('...for the like button', async ({ page }) => {
            await page.getByText('show all').click()
            await page.getByText('like').click()
            expect(page.getByText('Likes: 1')).toBeDefined()
        })
        
        test('...for the delete button', async ({ page }) => {
            await page.getByText('show all').click()
            await expect(page.getByText('delete')).toBeEnabled() // must be an owned blog
            await page.getByText('delete').click()
            await page.getByText('Yesss 🙆‍♂️').click()
            await expect(page.getByText('summary')).toBeHidden()
        })

        test('...for the delete button access', async ({ page }) => {
            await page.getByText('logout').click()
            const inputs = await page.getByRole('textbox').all()
            await inputs[0].fill('test2')
            await inputs[1].fill('test2')
            await page.locator('button[type="submit"]').click()
            
            await page.getByText('show all').click()

            await expect(await page.getByText('delete')).toBeDisabled()
        })
    })

    describe('Blogs are sorted...', () => {
        beforeEach(async ({ page }) => {
            const inputs = await page.getByRole('textbox').all()
            await inputs[0].fill('test1')
            await inputs[1].fill('test1')
            await page.locator('button[type="submit"]').click()
            
            for (let i=0; i<3; i++) {
                await page.getByRole('button', { name: 'create new' }).click()
                await page.getByPlaceholder('title').fill(`test title ${i}`)
                await page.getByPlaceholder('author').fill(`test1`)
                await page.getByPlaceholder('url').fill(`test-${i}.com`)
                await page.locator('button[type="submit"]').click()
                await expect(page.getByText(`test title ${i} by test1 show all`)).toBeVisible() // wait for me to render!
            }
        })
        
        test.only('...by likes in descending order', async ({ page }) => {

            // re-evaluating DOM works
            const TESTNUM = 3
            for (let i=0; i<TESTNUM; i++) {
                const showButtonsLocator = page.getByRole('button', { name: 'show all' })
                const showButtonsCount = await showButtonsLocator.count()
                expect(showButtonsCount).toBeGreaterThan(0)
                const showButtons = await showButtonsLocator.all()
                await showButtons[0].click()
            }
            
            // whenever you click something...DOM changes ??
            for (let i=0; i<TESTNUM; i++) {
                for (let j=0; j<i+1; j++) {
                    const likeButtonLocator = page.getByRole('button', { name: 'like' })
                    expect(await likeButtonLocator.count()).toBe(TESTNUM)
                    const likeButton = likeButtonLocator.nth(TESTNUM - 1)
                    await likeButton.click()
                }
            }

            const blogs = page.locator('.blog')
            const blogLikes = await blogs.evaluateAll(elements => 
                elements.map(el => {
                    const titleNum = parseInt(el.innerText.match(/^Title:.*?(\d+)/)[1], 10)
                    const likes = parseInt(el.innerText.match(/Likes:.*?(\d+)/)[1], 10)
                    return { titleNum, likes }
                })
            )
            const sorted = [...blogLikes].sort((a, b) => b.likes - a.likes)
            expect(blogLikes).toEqual(sorted)

            // const numbers = likeTexts.map((text) => {
            //     const match = text.match(/^Title:.*?(\d+)/)
            //     return parseInt(match[1], 10)
            // })
            // for (let i=0; i<TESTNUM; i++) {
            //     expect(numbers[i]).toBe(TESTNUM-i-1)
            // }
            
            // console.log(await page.getByTestId('whole').innerHTML())
        })
    })
})
