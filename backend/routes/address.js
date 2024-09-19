const router = require('express').Router()
const { addAddress, deleteAddress } = require('../controllers/address')
const protect = require('../middlewares/protectRoute')

router.post('/add', protect, addAddress)
router.delete('/delete', protect, deleteAddress)

module.exports = router;
