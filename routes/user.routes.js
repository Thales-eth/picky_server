const router = require('express').Router()
const { validateToken } = require('../middleware/validateToken.middleware')
const { getUsers, getOneUser, getLoggedUser, editUser, deleteUser } = require("../controllers/user.controller")

router.get('/list', getUsers)
router.get('/getOneUser/:user_id', getOneUser)
router.get('/getLoggedUser', validateToken, getLoggedUser)
router.put('/edit/:user_id', editUser)
router.delete('/delete/:user_id', deleteUser)

module.exports = router