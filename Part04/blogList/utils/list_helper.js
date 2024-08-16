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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}