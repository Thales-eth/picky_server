const router = require('express').Router()
const { signup, login } = require('../controllers/auth.controller')

router.post('/create', signup)
router.post('/login', login)

module.exports = router