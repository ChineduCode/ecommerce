const Address = require('../models/address')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const addAddress = asyncHandler( async (req, res)=> {
    try {
        const userId = req.user._id
        const { phone, country, state, city, street, houseNo, postalCode, defaultAddress } = req.body.addressData
        console.log(req.body.addressData)
        if(!phone || !country || !state || !street || !city || !houseNo || !postalCode){
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
            postalCode,
            defaultAddress,
            user: userId
        })

        await address.save()
        
        user.addresses.unshift(address._id)
        await user.save()

        // Populate the addresses so the user object contains full address details
        const updatedUser = await User.findById(userId).populate('addresses');

        return res.status(201).json({
            message: 'Address added successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = {
    addAddress
}