import Blog from "./Blog"
const Content = ({ blogs, logout}) => {
    return (
        <>
            <h2>Blogs</h2>
            <button onClick={logout}>logout</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Content