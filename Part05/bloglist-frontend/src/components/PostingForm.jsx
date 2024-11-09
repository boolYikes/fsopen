import blogsService from '../services/blogs'
import { useState } from 'react'

const PostingForm = ({ addBlog }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            blogsService.setToken(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)
            const res = await blogsService.create({
                title: formData.title,
                author: formData.author,
                url: formData.url,
            })
            setFormData({
                title: '',
                author: '',
                url: ''
            })
            addBlog(res)
        } catch (exception) {
            console.error(exception)
        }
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <label>title:<input type="text" name="title" value={formData.title} onChange={handleChange}/></label><br/>
                <label>author:<input type="text" name="author" value={formData.author} onChange={handleChange}/></label><br/>
                <label>url:<input type="text" name="url" value={formData.url} onChange={handleChange}/></label><br/>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default PostingForm