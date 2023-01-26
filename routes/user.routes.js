const router = require('express').Router()
const { validateToken } = require('../middleware/validateToken.middleware')
const { getUsers, getOneUser, getLoggedUser, editUser, editLikes, dislikePhoto, deleteUser } = require("../controllers/user.controller")

router.get('/list', getUsers)
router.get('/getOneUser/:user_id', getOneUser)
router.get('/getLoggedUser', validateToken, getLoggedUser)
router.put('/edit/:user_id', editUser)
router.put('/like/:photo_id', validateToken, editLikes)
router.put('/dislike/:photo_id', validateToken, dislikePhoto)
router.delete('/delete/:user_id', deleteUser)

module.exports = router