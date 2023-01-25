const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const { signJwt } = require('../utils/jwt.util')

const signup = (req, res, next) => {
    const { username, email, password: plainPwd, avatar } = req.body

    if (!email.trim() || !plainPwd) {
        res.status(400).json({ err: "Please, enter email or password" })
        return
    }

    // Regex to check email-like general structure
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!email.match(regex)) {
        res.status(400).json({ err: "Choose a valid email" })
        return
    }

    bcrypt
        .genSalt(+process.env.SALT)
        .then(salt => {
            const hashedPwd = bcrypt.hashSync(plainPwd, salt)
            return User.create({ username, email, password: hashedPwd, avatar })
        })
        .then(user => res.status(201).json(user))
        .catch(err => {
            if (err.message.split(" ")[0] === 'E11000') {
                res.status(400).json({ error: "Username already in use!" })
                return
            }

            res.status(500).json({ error: err.message })
        })
}

const login = (req, res, next) => {
    const { email, password: plainPwd } = req.body

    if (!email.trim() || !plainPwd) {
        res.status(400).json({ err: "Please, enter email or password" })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(400).json({ err: "Wrong email or password" })
                return
            }

            const { _id: userId, email, password: hashedPwd } = user

            if (!bcrypt.compareSync(plainPwd, hashedPwd)) {
                res.status(400).json({ err: "Wrong email or password!" })
            }

            res.status(200).json(signJwt(userId.toString(), email))
            return

        })
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { signup, login }