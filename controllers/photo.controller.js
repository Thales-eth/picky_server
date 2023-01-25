const Photo = require('../models/Photo.model')

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

const getOnePhoto = (req, res, next) => {
    const { photo_id } = req.params

    Photo
        .findById(photo_id)
        .select("-createdAt -updatedAt -__v")
        .then(photo => {
            res.status(200).json(photo)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

// CLOUDINARY ROUTE
const uploadPhoto = (req, res, next) => {

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

module.exports = { getPhotos, getOnePhoto, uploadPhoto, editPhoto, deletePhoto }