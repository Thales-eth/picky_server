const jwt = require('jsonwebtoken')

const signJwt = (userId, email) => {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '2d', subject: userId })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

module.exports = { signJwt, verifyToken }