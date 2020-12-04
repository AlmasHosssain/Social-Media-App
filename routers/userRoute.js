const router = require('express').Router()
const { registration,logIn,getAllUser,getSingleUser,updateUser,changeUserPassword,deleteUser } = require('../controllers/userController')

router.post('/registration',registration)
router.post('/login',logIn)
router.get('/',getAllUser)
router.get('/:userId',getSingleUser)
router.put('/:userId',updateUser)
router.put('/',changeUserPassword)
router.delete('/:userId',deleteUser)

module.exports = router