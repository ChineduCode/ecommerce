const router = require('express').Router()
const { createOrder, getUserOrders } = require('../controllers/order')
const protect = require('../middlewares/protectRoute')

router.post('/create', protect, createOrder)
router.get('/', protect, getUserOrders)

module.exports = router
