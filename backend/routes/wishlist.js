const router = require('express').Router()
const { addWishlist, getWishlist, removeWishlist, moveToCart } = require('../controllers/wishlist')
const protect = require('../middlewares/protectRoute')

router.get('/', protect, getWishlist)
router.post('/add', protect, addWishlist)
router.patch('/delete', protect, removeWishlist)
router.patch('/move-to-cart', protect, moveToCart)

module.exports = router
