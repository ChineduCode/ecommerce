const router = require('express').Router()
const { addAddress, deleteAddress, updateAddress } = require('../controllers/address')
const protect = require('../middlewares/protectRoute')

router.post('/add', protect, addAddress)
router.patch('/update', protect, updateAddress)
router.delete('/delete', protect, deleteAddress)

module.exports = router;
