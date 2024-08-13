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
    address: {
        type: String,
        required: true
    },
    orders: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order' 
        }
    ]

},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
