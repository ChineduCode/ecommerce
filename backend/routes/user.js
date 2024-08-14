const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getAllUsers, getUser } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/:id', getUser)

module.exports = router;
