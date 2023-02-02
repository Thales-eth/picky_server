const Comment = require("../models/Comment.model")
const User = require("../models/User.model");
const Photo = require("../models/Photo.model");

const getCommentedPhoto = (req, res, next) => {
    const { photo_id } = req.params

    Photo
        .findById(photo_id)
        .populate("author")
        .populate("comments")
        .populate({
            path: "comments",
            select: "-updatedAt -__v",
            populate: {
                path: "author",
                select: "-password -personalPhotos -favoritePhotos -createdAt -updatedAt -__v -email",
                model: "User"
            }
        })
        .select("-__v -updatedAt -comments.description")
        .then(photo => {
            res.status(200).json(photo)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const getComment = (req, res, next) => {
    const { comment_id } = req.params

    Comment
        .findById(comment_id)
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({ error: err.message }))
}

const createPhoto = (req, res, next) => {
    const { description } = req.body
    const { id } = req.user
    const { photo_id } = req.params

    User
        .findById(id)
        .then(() => {
            return Comment.create({ description, author: id })
        })
        .then(comment => {
            return Photo
                .findByIdAndUpdate(photo_id, { $push: { comments: comment._id } }, { new: true })
                .populate("comments")
        })
        .then(photo => res.status(200).json(photo))
        .catch(err => res.status(500).json({ error: err.message }))
}

const editComment = (req, res, next) => {
    const { comment_id } = req.params
    const { description } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { description }, { new: true })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    const { photo_id } = req.params
    console.log("LA ID=>", photo_id)

    Comment
        .findByIdAndDelete(comment_id)
        .then((comment) => {
            console.log("AQUÍ ENTRO")
            return Photo
                .findByIdAndUpdate(photo_id, { $pull: { comments: comment._id } }, { new: true })
                .populate("comments")
        })
        .then((photo) => {
            res.status(200).json(photo.comments)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { getCommentedPhoto, getComment, createPhoto, editComment, deleteComment }