const router = require("express").Router();
const { getCommentedPhoto, createPhoto, editComment, deleteComment } = require('../controllers/comment.controller')
const { validateToken } = require('../middleware/validateToken.middleware');

router.get('/list/:photo_id', getCommentedPhoto)
router.post('/create/:photo_id', validateToken, createPhoto)
router.put('/edit/:comment_id', editComment)
router.delete('/delete/:comment_id/:photo_id', deleteComment)

module.exports = router;
