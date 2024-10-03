const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Cart = require('../models/cart')
const Address = require('../models/address')
const User = require('../models/user')
const axios = require('axios')

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

//Generate Access Token for the Transaction
const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }

        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
        const { data } = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};


const createOrder = async (cart) => {
    try {
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00",
                    },
                },
            ],
        };

        const { data } = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            jsonResponse: data,
            httpStatusCode: 201,
        };
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw new Error('PayPal order creation failed');
    }
};

// Capture payment for the created order
const captureOrder = async (orderID) => {
    try {
        // Generate access token
        const accessToken = await generateAccessToken();

        // PayPal API endpoint to capture the order
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        // Send request to capture the order
        const { data } = await axios.post(url, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Return the captured order details
        return {
            jsonResponse: data,
            httpStatusCode: 200,
        };
    } catch (error) {
        console.error("Failed to capture order:", error);
        throw new Error('Order capture failed');
    }
};

const addOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        //const { paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body
        const cart = req.body
        
        const [user, userCart, userAddress] = await Promise.all([
            User.findById(userId),
            Cart.findOne({user: userId}),
            Address.find({user: userId})
        ])

        if(!user) return res.status(404).json({ message: 'User not found' })
        if(!userCart) return res.status(404).json({ message: 'User cart is empty' })
        if(!userAddress) return res.status(404).json({ message: 'Address not found' })

        // const order = new Order({
        //     user: userId,
        //     orderItems: userCart.cartItems,
        //     shippingAddress: userAddress.find(address => address.defaultAddress)._id,
        //     paymentMethod,
        //     paymentResult: {
        //         id,
        //         status,
        //         update_time,
        //         update_email
        //     },
        //     taxPrice,
        //     shippingPrice,
        //     totalPrice,
        //     isPaid: false,
        //     paidAt,
        //     isDelivered: false,
        //     deliveredAt
        // })
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);

    } catch (error) {
        console.error("Failed to create order:", error);
        return res.status(500).json({ message: 'Internal server error' })
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
