const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUser, 
    verifyUserEmail, 
    sendUserOTP, 
    verifyUserOTP,
    updateUserPassword
} = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/id/:id', getUser)
router.post('/verify-email', verifyUserEmail)
router.post('/forgot-password/send-otp', sendUserOTP)
router.post('/forgot-password/verify-otp', verifyUserOTP)
router.post('/update-password', updateUserPassword)

module.exports = router;
