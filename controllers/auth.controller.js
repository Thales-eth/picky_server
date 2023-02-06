const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const { signJwt } = require('../utils/jwt.util')

const signup = (req, res, next) => {
    const { username, email, password, avatar } = req.body

    User.create({ username, email, password, avatar })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
}

const login = (req, res, next) => {
    const { email, password: plainPwd } = req.body

    if (!email.trim() || !plainPwd) {
        res.status(400).json({ err: ["Please, enter email or password"] })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(400).json({ err: ["Wrong email or password"] })
                return
            }

            const { _id: userId, email, password: hashedPwd } = user

            if (!bcrypt.compareSync(plainPwd, hashedPwd)) {
                res.status(400).json({ err: ["Wrong email or password!"] })
                return
            }

            res.status(200).json(signJwt(userId.toString(), email))
            return

        })
        .catch(err => next(err))
}

module.exports = { signup, login }