const router = require("express").Router();

router.use('/users', require('../routes/user.routes'))
router.use('/photos', require('../routes/photo.routes'))

module.exports = router;
