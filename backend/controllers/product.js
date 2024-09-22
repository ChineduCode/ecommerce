const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

const getAllProduct = asyncHandler( async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        return res.json(products)
        
    } catch (error) {
        console.log(`Error fetching products ${error.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getProduct = asyncHandler( async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id).lean()
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        return res.json(product)

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

        const productCategory = await Product.find(query).lean()
        if(productCategory.length === 0){
            return res.status(404).json({ message: 'Products not found' })
        }

        return res.json(productCategory)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getBestSellers = asyncHandler(async (req, res)=> {
    try{
        // const products = await Product.aggregate([
        //     {
        //         $sort: { createdAt: 1 }
        //     },
        //     {
        //         $group: {
        //             _id: "$brand",
        //             count: {$sum: 1},
        //             image: { $first: "$image" } 
        //         }
        //     },
        //     {
        //         $match: {
        //             count: {$gt: 2}
        //         }
        //     },
        //     {
        //         $project: {
        //             count: 1,
        //             image: 4
        //         }
        //     }
        // ])
        const products = require('../data/bestsellers')
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'No brands found with more than two occurrences' });
        }
      
        return res.json(products);

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = {
    getAllProduct,
    getProduct,
    getProductCategory,
    getBestSellers
}
