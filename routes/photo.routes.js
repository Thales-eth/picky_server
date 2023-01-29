const router = require('express').Router()
const { getPhotos, getOnePhoto, uploadPhoto, uploadAvatar, editPhoto, deletePhoto, getLikedPhotos, getPersonalPhotos } = require('../controllers/photo.controller')
const { validateToken } = require('../middleware/validateToken.middleware')
const fileUploader = require('../config/cloudinary.config.js')

router.get('/list', getPhotos)
router.get('/list/likedPhotos/:user_id', getLikedPhotos)
router.get('/list/personalPhotos/:user_id', getPersonalPhotos)
router.get('/getOnePhoto/:photo_id', getOnePhoto)
router.post('/upload', fileUploader.single('imageUrl'), validateToken, uploadPhoto)
router.post('/uploadAvatar', fileUploader.single('imageUrl'), uploadAvatar)
router.put('/edit/:photo_id', editPhoto)
router.delete('/delete/:photo_id', deletePhoto)

module.exports = router
