const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    houseNo: {
        type: Number,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    defaultAddress: {
        type: Boolean,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Address', addressSchema)
