const log = (...content) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV ==='development'){
        console.log(...content)
    }
}
const error = (...content) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV ==='development'){
        console.log(...content)
    }
}

module.exports = {
    log,
    error
}