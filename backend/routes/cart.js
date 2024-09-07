const router = require('express').Router()
const { addToCart, getUserCart } = require('../controllers/cart')
const protect = require('../middlewares/protectRoute')

router.post('/add-cart', protect, addToCart)
router.get('/', protect, getUserCart)

module.exports = router
