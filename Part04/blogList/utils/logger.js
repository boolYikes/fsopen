const log = (...content) => {
    console.log(...content)
}
const error = (...content) => {
    console.error(...content)
}

module.exports = {
    log,
    error
}