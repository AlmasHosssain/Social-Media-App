const router = require('express').Router()
const { testEmail } = require('../controllers/test')

router.post('/email',testEmail)

module.exports = router