const dummy = (blogs) => {
    console.log(`Dummy recieving ${blogs}`)
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((prev, x) => x.likes + prev, 0)
}
const favoriteBlog = (blogs) => {
    const result = blogs.reduce((prev, curr) => {
        return prev.likes < curr.likes ? curr : prev
    }, blogs[0])
    // console.log(`The result is : ${result}`)
    return result
}
const mostBlogsOwned = (blogs) => {
    let counter = {}
    let mx = {author: "", blogs: 0}
    blogs.forEach(blog => {
        if (!counter[blog.author]) { 
            counter[blog.author] = 0
        }
        counter[blog.author] += 1
        // console.log(counter)
        mx = counter[blog.author] > mx.blogs 
        ? {author: blog.author, blogs: counter[blog.author]} 
        : mx
    })
    return mx
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogsOwned
}