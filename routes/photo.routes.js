const router = require('express').Router()
const { getPhotos, getOnePhoto, uploadPhoto, editPhoto, deletePhoto } = require('../controllers/photo.controller')
const fileUploader = require('../config/cloudinary.config.js')

router.get('/list', getPhotos)
router.get('/getOnePhoto/:photo_id', getOnePhoto)
// CLOUDINARY UPLOAD PHOTO ROUTE
router.post('/upload', fileUploader.single('imageUrl'), uploadPhoto)
router.put('/edit/:photo_id', editPhoto)
router.delete('/delete/:photo_id', deletePhoto)

module.exports = router
