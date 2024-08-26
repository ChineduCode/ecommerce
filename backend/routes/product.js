const express = require('express')
const router = express.Router()
const { getProduct, getAllProduct } = require('../controllers/product')

router.get('/', getAllProduct)
router.get('/:id', getProduct)

module.exports = router;
