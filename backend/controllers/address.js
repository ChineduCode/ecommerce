const Address = require('../models/address')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const addAddress = asyncHandler( async (req, res)=> {
    try {
        const userId = req.user._id
        const { phone, country, state, city, street, houseNo, zipCode, defaultAddress } = req.body
        if(!phone || !country || !state || !street || !city || !houseNo || !zipCode || !defaultAddress ){
            return res.status(404).json({message: 'All fields are required'})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const address = new Address({
            phone,
            country,
            state,
            city,
            street,
            houseNo,
            zipCode,
            defaultAddress,
            user: userId
        })

        await address.save()
        
        user.addresses.unshift(address._id)
        await user.save()

        console.log(user)
        console.log(address)

        return res.status(201).json({message: 'Address added successfully', address })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = {
    addAddress
}