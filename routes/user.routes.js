const router = require('express').Router()
const { validateToken } = require('../middleware/validateToken.middleware')
const { getUsers, getFriendsPhotos, getFriends, getOneUser, getLoggedUser, editUser, followUser, unfollowUser, editLikes, dislikePhoto, deleteUser } = require("../controllers/user.controller")

router.get('/list', getUsers)
router.get('/list/friendsPhotos', validateToken, getFriendsPhotos)
router.get('/friends/:user_id', getFriends)
router.get('/getOneUser/:user_id', getOneUser)
router.get('/getLoggedUser', validateToken, getLoggedUser)
router.put('/edit/:user_id', editUser)
router.put('/follow/:user_id', validateToken, followUser)
router.put('/unfollow/:user_id', validateToken, unfollowUser)
router.put('/like/:photo_id', validateToken, editLikes)
router.put('/dislike/:photo_id', validateToken, dislikePhoto)
router.delete('/delete/:user_id', deleteUser)

module.exports = router