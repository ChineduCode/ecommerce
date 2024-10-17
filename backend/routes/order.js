const router = require('express').Router()
const { createOrder, getUserOrders, bestSellers } = require('../controllers/order')
const protect = require('../middlewares/protectRoute')

router.post('/create', protect, createOrder)
router.get('/', protect, getUserOrders)
router.get('/best-sellers', bestSellers)

module.exports = router
