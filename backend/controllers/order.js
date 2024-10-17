const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Cart = require('../models/cart')
const Address = require('../models/address')
const User = require('../models/user')
const Product = require('../models/product')

const createOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const { transaction, status, message, date, totalPrice, shippingPrice  } = req.body

        const user = await User.findById(userId).populate('addresses')
        if(!user) return res.status(404).json({message: 'User not found'})

        const userCart = await Cart.findOne({user: userId})
        if(!userCart) return res.status(400).json({message: 'Cart is empty. Add item to proceed'})

        const userAddress = await Address.findOne({
            user: userId,
            defaultAddress: true
        })
        if(!userAddress) return res.status(400).json({message: 'Address not found'})

        const order = new Order({
            user: user._id,
            orderItems: userCart.cartItems,
            shippingAddress: userAddress._id,
            paymentMethod: 'card',
            paymentResult: {
                id: transaction,
                status,
                message,
                update_time: date,
            },
            shippingPrice,
            totalPrice,
            isPaid: true,
            paidAt: date
        })
        await order.save()
        await Cart.deleteOne({user: userId})
        return res.status(201).json({message: 'Order added successfully', order})

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getUserOrders = asyncHandler(async (req, res) => {
    try{
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'User not found'})
        
        const orders = await Order.find({user: userId})
            .select('orderItems')
            .populate({
                path: 'orderItems.product',
                select: 'name image price'
            })
        return res.status(200).json(orders)

    }catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

const getUserOrderById = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params
        const userId = req.user._id
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

const bestSellers = asyncHandler(async (req, res) => {
    try{
        const orders = await Product.find({}) //Will still be modified when users creating orders
        const shuffledOrders = orders.sort(() => 0.5 - Math.random());
        const randomOrders = shuffledOrders.slice(0, 8);
        
        return res.status(200).json(randomOrders);
    } catch(error) {
        console.log(error.stack, error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = {
    createOrder,
    getUserOrders,
    getUserOrderById,
    bestSellers
}
