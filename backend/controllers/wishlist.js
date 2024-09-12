const Wishlist = require('../models/wishlist')
const User = require('../models/user')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

const addWishlist = asyncHandler(async (req, res)=> {
    const userId = req.user._id
    const { productId } = req.body

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        const userWishlist = await Wishlist.findOne({user: userId})
        if(userWishlist){
            const wishlistExist = userWishlist.wishlistItems.find(item => item.product.toString() === productId)
            if(wishlistExist){
                return res.status(400).json({message: 'Wishlist already exist'})
            }

            userWishlist.wishlistItems.unshift({product: productId})
            await userWishlist.save()

            return res.status(201).json({message: 'Wishlist successfully added', wishlist: userWishlist})

        }else{
            const newWishlist = new Wishlist({
                user: userId,
                wishlistItems: [{product: productId}]
            })

            await newWishlist.save()
            return res.status(201).json({message: 'Wishlist successfully added', wishlist: newWishlist})
        }

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

const getWishlist = asyncHandler(async (req, res)=> {
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const wishlist = await Wishlist.findOne({user: userId}).populate({
            path: 'wishlistItems.product',
            select: 'name image price brand'
        })
        if(!wishlist){
            return res.status(404).json({message: 'Wishlist not found'})
        }

        return res.status(200).json(wishlist)

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

const removeWishlist = asyncHandler(async (req, res)=> {
    const userId = req.user._id
    const { itemId } = req.body

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { wishlistItems: { _id: itemId } } },
            { new: true }
        )
        .populate({
            path: 'wishlistItems.product',
            select: 'name image price brand'
        })

        if(!wishlist){
            return res.status(404).json({message: 'Wishlist not found'})
        }

        return res.status(200).json({message: 'Item successfully removed', wishlist: wishlist})

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}