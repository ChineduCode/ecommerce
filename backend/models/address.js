const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    type: { type: String, enum: ['home', 'work'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to user
});

module.exports = mongoose.model('Address', addressSchema)
