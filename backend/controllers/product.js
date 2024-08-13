const Product = require('../models/productModel')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        console.log(`Error fetching products ${error.message}`)
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({error: 'Product not found'})
        }

        res.json(product)

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getProducts,
    getProduct
}
