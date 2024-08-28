const express = require('express')
const router = express.Router()
const { getProduct, getAllProduct, getProductCategory } = require('../controllers/product')

router.get('/', getAllProduct)
router.get('/id/:id', getProduct)
router.get('/categories', getProductCategory)

module.exports = router;
