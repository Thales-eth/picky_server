const User = require('../models/User.model')
const Photo = require('../models/Photo.model')
const { isValid } = require('../utils/isValidId')

const getUsers = (req, res, next) => {
    User
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const getOneUser = (req, res, next) => {
    const { user_id } = req.params

    const validUserId = isValid(user_id)

    if (!validUserId) {
        res.status(400).json({ err: 'Sorry, this is not a valid Mongo Id' })
        return
    }

    User
        .findById(user_id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const getLoggedUser = (req, res, next) => {
    const { id } = req.user

    User
        .findById(id)
        .select("-createdAt -updatedAt -__v")
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const editUser = (req, res, next) => {
    const { user_id } = req.params
    const { username, email, password, avatar, personalPhotos, favoritePhotos } = req.body

    const validUserId = isValid(user_id)

    if (!validUserId) {
        res.status(400).json({ err: 'Sorry, this is not a valid Mongo Id' })
        return
    }

    User
        .findByIdAndUpdate(user_id, { username, email, password, avatar, personalPhotos, favoritePhotos }, { new: true })
        .select("-createdAt -updatedAt -__v")
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const editLikes = (req, res, next) => {
    const { photo_id } = req.params
    const { id } = req.user

    User
        .findByIdAndUpdate(id, { $addToSet: { favoritePhotos: photo_id } }, { new: true })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const dislikePhoto = (req, res, next) => {
    const { photo_id } = req.params
    const { id } = req.user

    User
        .findByIdAndUpdate(id, { $pull: { favoritePhotos: photo_id } }, { new: true })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const deleteUser = (req, res, next) => {
    const { user_id: id } = req.params


    const validUserId = isValid(id)

    if (!validUserId) {
        res.status(400).json({ err: 'Sorry, this is not a valid Mongo Id' })
        return
    }

    User
        .findByIdAndDelete(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { getUsers, getOneUser, getLoggedUser, editUser, editLikes, dislikePhoto, deleteUser }
