import Blog from "./Blog"
import PostingForm from "./PostingForm"
const Content = ({ blogs, logout, username, addBlog }) => {
    return (
        <>
            <h2>Blogs</h2>
            Hello, {username}! <button onClick={logout}>logout</button>
            {username ? <PostingForm addBlog={addBlog}/> : <br/>}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Content