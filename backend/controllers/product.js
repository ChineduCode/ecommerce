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

const getProductCategory = asyncHandler( async (req, res)=> {
    try {
        const { category, subCategory, brand } = req.query

        let query = {}

        switch (true) {
            case Boolean(category && subCategory && brand):
                query = { category, subCategory, brand }
                break;
        
            case Boolean(category && subCategory):
                query = { category, subCategory }
                break;
        
            case Boolean(category && brand):
                query = {
                    $or: [{ category }, { subCategory: category }],
                    brand
                }
                break;
        
            case Boolean(subCategory && brand):
                query = {
                    $or: [{ category: subCategory }, { subCategory }],
                    brand
                }
                break;
        
            case Boolean(category):
                query = {
                    $or: [{ category }, { subCategory: category }]
                }
                break;
        
            case Boolean(subCategory):
                query = {
                    $or: [{ category: subCategory }, { subCategory }]
                }
                break;
        
            case Boolean(brand):
                query = { brand }
                break;
        
            default:
                query = {};
                break;
        }

        const productCategory = await Product.find(query)

        if(productCategory.length === 0){
            return res.status(404).json({ message: 'Products not found' })
        }

        return res.status(200).json(productCategory)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = {
    getAllProduct,
    getProduct,
    getProductCategory
}
