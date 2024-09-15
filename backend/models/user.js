const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: { type: Date }
    
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
