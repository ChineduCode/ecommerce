const router = require('express').Router()
const {addAddress} = require('../controllers/address')
const protect = require('../middlewares/protectRoute')

router.post('/add', protect, addAddress)

module.exports = router;