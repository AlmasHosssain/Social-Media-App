const router = require('express').Router()
const authentication = require('../authentication')
const { createPost,getAllPost,getSinglePost,deletePost,postUpdate,doComment,updateComment,deleteComment,getAllComment } = require('../controllers/postControl')

router.post('/',authentication,createPost)
router.get('/',authentication,getAllPost)
router.get('/:postId',getSinglePost)
router.delete('/:postId',authentication,deletePost)
router.put('/:postId',authentication,postUpdate)
router.post('/comment/:postId',authentication,doComment)
router.put('/comment/:commentId',authentication,updateComment)
router.delete('/comment/:commentId',authentication,deleteComment)

module.exports = router