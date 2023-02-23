function logger(req, res, next) {
    console.log(`${req.method} - ${req.path}`)
    const now = new Date()
    console.log(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}     ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
    next()
}

module.exports = {logger}