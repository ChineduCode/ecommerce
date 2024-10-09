const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Cart = require('../models/cart')
const Address = require('../models/address')
const User = require('../models/user')

const addOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const { transaction, status, message, date, totalPrice, shippingPrice  } = req.body

        const user = await User.findById(userId).populate('addresses')
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const userCart = await Cart.findOne({user: userId})
        if(!userCart){
            return res.status(400).json({message: 'Cart is empty. Add item to proceed'})
        }

        const userAddress = await Address.findOne({
            user: userId,
            defaultAddress: true
        })
        if(!userAddress){
            return res.status(400).json({message: 'Address not found'})
        }

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

        return res.status(201).json({message: 'Order added successfully', order})

    } catch (error) {
        console.error(error)
        //return res.status(500).json({ message: 'Internal server error' })
        res.status(error.response?.status || 500).json({ message: error.message });
    }
})

const captureUserOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

        return res.status(httpStatusCode).json(jsonResponse);

    } catch (error) {
        console.error("Failed to create order:", error);
        return res.status(500).json({ error: "Failed to capture order." });
    }
})

module.exports = {
    addOrder,
    captureUserOrder
}
