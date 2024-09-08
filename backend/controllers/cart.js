const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const addToCart = asyncHandler(async (req, res)=> {
    try{
        const userID = req.user?._id
        if(!userID){
            return res.status(401).json({ message: 'User not authnticated' })
        }

        const { productID, qty } = req.body
        if(!productID || !qty){
            return res.status(400).json({ message: 'All fields are required' })
        }
        
        const user = await User.findById(userID)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        const product = await Product.findById(productID)
        if(!product){
            return res.status(404).json({ message: 'Product not found' })
        }

        let userCart = await Cart.findOne({user: user._id})
        if(userCart){
            const itemExist = userCart.cartItems.find(item => item.product.toString() === productID)
            if(itemExist){
                return res.status(400).json({ message: 'Item already exist in cart'})
            }

            userCart.cartItems.unshift({ product: productID, quantity: qty })
            await userCart.save()

            return res.json(userCart)

        }else {
            //if no cart exist for the user
            const newCart = new Cart({
                user: user._id,
                cartItems: [{ product: product._id, qty }]
            })

            await newCart.save()
            return res.status(201).json({message: 'Item successfully added to cart'});
        }
        
    } catch (error){
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getUserCart = asyncHandler(async (req, res)=> {
    try{
        const userID = req.user?._id
        if(!userID){
            return res.status(401).json({ message: 'User not authnticated' })
        }
    
        const cart = await Cart.findOne({ user: userID }).populate({
            path: 'cartItems.product',
            select: 'name image price'
        })
        
        if(cart){
            console.log(cart)
            return res.json(cart)
        }else{
            return res.status(404).json({ message: 'Cart is empty'})
        }

    } catch(error){
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = {
    addToCart,
    getUserCart
}
