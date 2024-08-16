const dummy = (blogs) => {
    console.log(`Dummy recieving ${blogs}`)
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((prev, x) => x.likes + prev, 0)
}

module.exports = {
    dummy,
    totalLikes
}