const router = require("express").Router();

router.use('/users', require('../routes/user.routes'))
router.use('/photos', require('../routes/photo.routes'))
router.use('/comments', require('../routes/comments.routes'))
router.use('/auth', require('../routes/auth.routes'))

module.exports = router;
