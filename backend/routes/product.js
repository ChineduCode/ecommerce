const express = require('express')
const router = express.Router()
const { getProduct, getAllProduct, getProductCategory, getBestSellers } = require('../controllers/product')

router.get('/', getAllProduct)
router.get('/id/:id', getProduct)
router.get('/categories', getProductCategory)
router.get('/bestsellers', getBestSellers)

module.exports = router;
