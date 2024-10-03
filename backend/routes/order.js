const router = require('express').Router()
const { addOrder, captureUserOrder } = require('../controllers/order')
const protect = require('../middlewares/protectRoute')

router.post('/create', protect, addOrder)
router.post('/:orderID/capture', protect, captureUserOrder)

module.exports = router
