const Address = require('../models/address')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const addAddress = asyncHandler( async (req, res)=> {
    try {
        const userId = req.user._id
        const { phone, country, state, city, street, houseNo, postalCode, defaultAddress } = req.body.addressData
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
        const updatedUser = await User.findById(userId).populate('addresses').lean();

        return res.status(201).json({
            message: 'Address added successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

const editAddress = asyncHandler( async (req, res) => {
    try{
        const userId = req.user._id
        const {addressId, updatedAddress } = req.body

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const address = await Address.findByIdAndUpdate(
            addressId,
            {updatedAddress},
            {new: true}
        )

        if(!address){
            return res.status(404).josn({message: 'Address not found'})
        }

        return res.status(200).json({message: 'Address successfully updated', address})

    } catch(error){
        console.error(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }
})

const deleteAddress = asyncHandler( async (req, res) => {
    try {
        const userId = req.user._id
        const {addressId} = req.body

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const address = await Address.findByIdAndDelete(addressId)
        if(!address){
            return res.status(404).json({message: 'Address not found'})
        }

        user.addresses.filter((address)=> address.toString() !== addressId)
        await user.save()

        return res.status(200).json({message: 'Address successfully deleted', addresses: user.addresses})
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = {
    addAddress,
    editAddress,
    deleteAddress
}