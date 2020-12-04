const router = require('express').Router()
const authenticate = require('../authentication')
const { doMessage,getAllMessages,deleteMessage } = require('../controllers/messageController')

router.post('/',authenticate,doMessage)
router.get('/allMessages',authenticate,getAllMessages)
router.delete('/delete/:msgId',deleteMessage)

module.exports = router