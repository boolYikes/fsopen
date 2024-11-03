import Blog from "./Blog"
const Content = ({ blogs }) => {
    return (
        <>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Content