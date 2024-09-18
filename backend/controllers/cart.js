const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const addToCart = asyncHandler(async (req, res)=> {
    try{
        const userId = req.user?._id
        if(!userId){
            return res.status(401).json({ message: 'User not authenticated' })
        }

        const { productId, qty } = req.body
        if(!productId || !qty){
            return res.status(400).json({ message: 'All fields are required' })
        }
       
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ message: 'Product not found' })
        }

        let userCart = await Cart.findOne({user: user._id})
        if(userCart){
            const itemExist = userCart.cartItems.find(item => item.product.toString() === productId)
            if(itemExist){
                return res.status(400).json({ message: 'Item already exist in cart'})
            }

            userCart.cartItems.unshift({ product: productId, quantity: qty })
            await userCart.save()

            await userCart.populate({
                path: 'cartItems.product',
                select: 'name image price'
            })

            return res.status(201).json({message: 'Item successfully added to cart', cart: userCart})

        }else {
            //if no cart exist for the user
            const newCart = new Cart({
                user: user._id,
                cartItems: [{ product: product._id, quantity: qty }]
            })
            await newCart.save()
            
            await newCart.populate({
                path: 'cartItems.product',
                select: 'name image price'
            })

            return res.status(201).json({message: 'Item successfully added to cart', cart: newCart});
        }
        
    } catch (error){
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getUserCart = asyncHandler(async (req, res)=> {
    try{
        const userId = req.user?._id
        if(!userId){
            return res.status(401).json({ message: 'User not authenticated' })
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartItems.product',
            select: 'name image price'
        })
        
        if(!cart){
            return res.status(404).json({ message: 'Cart is empty'})
        }
        
        return res.status(200).json(cart)

    } catch(error){
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const deleteItem = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(401).json({message: 'User not authenticated'})
        }
        
        const { itemId } = req.body;

        let updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { cartItems: { _id: itemId } } }, // Use $pull to remove the item from the array
            { new: true } // Return the modified document
        )
        .populate({
            path: 'cartItems.product',
            select: 'name image price'
        })

        if (!updatedCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        return res.status(200).json({ message: 'Item removed successfully', cart: updatedCart });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    addToCart,
    getUserCart,
    deleteItem
}
