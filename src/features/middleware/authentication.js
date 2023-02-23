function isAuth(req, res, next) {
    const auth = req.headers.authorization
    if (auth == process.env.AUTH_TOKEN) {
        next()
    } else {
        res.status(401)
        res.send('Access Forbidden')
    }
}

module.exports = {isAuth}