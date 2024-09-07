const express = require('express')
const router = express.Router()
const protect = require('../middlewares/protectRoute')

const { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserProfile, 
    verifyUserEmail, 
    sendUserOTP, 
    verifyUserOTP,
    updateUserPassword
} = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/profile', protect, getUserProfile)
router.post('/verify-email', verifyUserEmail)
router.post('/forgot-password/send-otp', sendUserOTP)
router.post('/forgot-password/verify-otp', verifyUserOTP)
router.post('/update-password', updateUserPassword)

module.exports = router;
