const router = require('express').Router()
const { addWishlist, getWishlist, removeWishlist } = require('../controllers/wishlist')
const protect = require('../middlewares/protectRoute')

router.get('/', protect, getWishlist)
router.post('/add', protect, addWishlist)
router.patch('/delete', protect, removeWishlist)

module.exports = router
