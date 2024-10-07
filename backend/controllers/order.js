const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Cart = require('../models/cart')
const Address = require('../models/address') 
const User = require('../models/user')

const addOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const { totalPrice } = req.body
        const user = await User.findById(userId).populate('addresses')
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        console.log(totalPrice)

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
