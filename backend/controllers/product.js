const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

const getAllProduct = asyncHandler( async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json(products)
        
    } catch (error) {
        console.log(`Error fetching products ${error.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getProduct = asyncHandler( async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        return res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        return res.status(200).json({ message: 'Internal server error' })
    }
})

module.exports = {
    getAllProduct,
    getProduct
}
