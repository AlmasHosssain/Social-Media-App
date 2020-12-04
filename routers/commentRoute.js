const router = require('express').Router()
const authenticate = require('../authentication')
const {doComment} = require('../controllers/commentController')

router.post('/create',authenticate,doComment)

module.exports = router