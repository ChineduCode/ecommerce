const router = require('express').Router()
const { addToCart, getUserCart, deleteItem, updateCart } = require('../controllers/cart')
const protect = require('../middlewares/protectRoute')

router.get('/', protect, getUserCart)
router.post('/add', protect, addToCart)
router.patch('/delete', protect, deleteItem)
router.put('/update', protect, updateCart)

module.exports = router
