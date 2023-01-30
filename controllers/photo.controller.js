const Photo = require('../models/Photo.model')
const User = require('../models/User.model')

const getPhotos = (req, res, next) => {
    Photo
        .find()
        .select("-createdAt -updatedAt -__v")
        .sort({ createdAt: -1 })
        .lean()
        .then(photos => {
            res.status(200).json(photos)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const getLikedPhotos = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .populate({
            path: "favoritePhotos",
            select: "url"
        })
        .then(user => {
            return user.favoritePhotos
        })
        .then(photos => res.status(200).json(photos))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getPersonalPhotos = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .populate({
            path: "personalPhotos",
            select: "url"
        })
        .then(user => {
            return user.personalPhotos
        })
        .then(photos => res.status(200).json(photos))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getOnePhoto = (req, res, next) => {
    const { photo_id } = req.params

    Photo
        .findById(photo_id)
        .select("-createdAt -updatedAt -__v")
        .then(photo => {
            if (!photo) {
                res.status(404).json({ err: "Photo does not longer exist or was not found :(" })
                return
            }
            res.status(200).json(photo)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const uploadPhoto = (req, res, next) => {
    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error cargando el archivo' })
        return
    }

    const { id } = req.user
    let newPhoto = ""

    Photo
        .create({ url: req.file.path, author: id })
        .then(photo => {
            newPhoto = photo
            return User.findByIdAndUpdate(id, { $addToSet: { personalPhotos: photo._id } }, { new: true })
        })
        .then(() => res.status(200).json(newPhoto))
        .catch(err => res.status(500).json({ error: err.message }))
}

const uploadAvatar = (req, res, next) => {
    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error cargando el archivo' })
        return
    }

    res.status(200).json(req.file.path)
}

const editPhoto = (req, res, next) => {
    const { photo_id } = req.params
    const { url, comments } = req.body

    Photo
        .findByIdAndUpdate(photo_id, { url, comments }, { new: true })
        .select("-createdAt -updatedAt -__v")
        .then(photo => res.status(200).json(photo))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deletePhoto = (req, res, next) => {
    const { photo_id } = req.params

    Photo
        .findByIdAndDelete(photo_id)
        .then(() => {
            res.status(200).json({ msg: "Photo successfully deleted!" })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { getPhotos, getLikedPhotos, getPersonalPhotos, getOnePhoto, uploadPhoto, uploadAvatar, editPhoto, deletePhoto }