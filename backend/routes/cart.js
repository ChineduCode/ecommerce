const router = require('express').Router()
const { addToCart, getUserCart, deleteItem } = require('../controllers/cart')
const protect = require('../middlewares/protectRoute')

router.get('/', protect, getUserCart)
router.post('/add', protect, addToCart)
router.patch('/delete', protect, deleteItem)

module.exports = router
