const Wishlist = require('../models/wishlist')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const asyncHandler = require('express-async-handler')

const addWishlist = asyncHandler(async (req, res)=> {
    try {
        const userId = req.user._id
        const { productId } = req.body

        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findById(productId)
        ])

        if(!user) return res.status(404).json({message: 'User not found'})
        if(!product) return res.status(404).json({message: 'Product not found'})

        const userWishlist = await Wishlist.findOne({user: userId})
        if(userWishlist){
            const wishlistExist = userWishlist.wishlistItems.find(item => item.toString() === productId)
            if(wishlistExist) return res.status(400).json({message: 'Wishlist already exist'})

            userWishlist.wishlistItems.unshift(productId)
            await userWishlist.save()
            
            //Remove Item from cart if it exists
            let updatedCart = await Cart.findOneAndUpdate(
                { user: userId },
                { $pull: { cartItems: { product: productId }}},
                { new: true }
            )
            .populate({
                path: 'cartItems.product',
                select: 'name image price'
            })

            return res.status(201).json({
                message: 'Wishlist successfully added', 
                wishlist: userWishlist, 
                cart: updatedCart?.cartItems || null
            })

        }else{
            const newWishlist = new Wishlist({
                user: userId,
                wishlistItems: [productId]
            })

            await newWishlist.save()
            
            //Remove Item from cart if it exists
            let updatedCart = await Cart.findOneAndUpdate(
                { user: userId },
                { $pull: { cartItems: { product: productId }}},
                { new: true }
            )
            .populate({
                path: 'cartItems.product',
                select: 'name image price'
            })

            return res.status(201).json({
                message: 'Wishlist successfully added', 
                wishlist: newWishlist, 
                cart: updatedCart?.cartItems || null
            })
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
        if(!user) return res.status(404).json({message: 'User not found'})

        const wishlist = await Wishlist.findOne({user: userId}).populate({
            path: 'wishlistItems',
            select: 'name image price brand'
        })
        
        if (!wishlist) return res.json({ message: 'No wishlist found. You can add a new wishlist.' });

        return res.status(200).json(wishlist)

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

const removeWishlist = asyncHandler(async (req, res)=> {
    try {
        const userId = req.user._id
        const { productId } = req.body

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'User not found'})

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { wishlistItems: productId }},
            { new: true }
        )
        .populate({
            path: 'wishlistItems',
            select: 'name image price brand'
        })

        if(!wishlist) return res.status(404).json({message: 'Wishlist not found'})

        if(wishlist.wishlistItems.length === 0){
            await Wishlist.deleteOne({ _id: wishlist._id })
            return res.status(200).json({ message: 'Wishlist is empty and has been deleted.' });
        }

        return res.status(200).json({ message: 'Item successfully removed', wishlist })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

// const moveToCart = asyncHandler(async (req, res)=> {
//     try {
//         const userId = req.user._id
//         const { productId } = req.body
//         if(!productId){
//             return res.status(404).json({message: 'ProductId not found'})
//         }
        
//         const user = await User.findById(userId)
//         if(!user){
//             return res.status(404).json({message: 'User not found'})
//         }

//         const product = await Product.findById(productId)
//         if(!product){
//             return res.status(404).json({message: 'Product not found'})
//         }

//         const wishlist = await Wishlist.findOneAndUpdate(
//             { user: userId },
//             { $pull: { wishlistItems: productId }},
//             { new: true }
//         )
//         .populate({
//             path: 'wishlistItems',
//             select: 'name image price brand'
//         })

//         if(!wishlist){
//             return res.status(404).json({message: 'Wishlist not found'})
//         }

//         let userCart = await Cart.findOne({user: user._id})
//         if(userCart){
//             const itemExist = userCart.cartItems.find(item => item.product.toString() === productId)
//             if(itemExist){
//                 return res.status(400).json({ message: 'Item already exist in cart'})
//             }

//             userCart.cartItems.unshift({ product: productId, quantity: qty })
//             await userCart.save()

//             await userCart.populate({
//                 path: 'cartItems.product',
//                 select: 'name image price'
//             })

//             return res.status(201).json({message: 'Item successfully moved to cart', cart: userCart})

//         }else {
//             //if no cart exist for the user
//             const newCart = new Cart({
//                 user: user._id,
//                 cartItems: [{ product: product._id }]
//             })
//             await newCart.save()
            
//             await newCart.populate({
//                 path: 'cartItems.product',
//                 select: 'name image price'
//             })

//             return res.status(201).json({message: 'Item successfully moved to cart', cart: newCart});
//         }

//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({message: 'Internal server error'})
//     }
// })

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}
