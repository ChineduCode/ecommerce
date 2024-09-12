const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    cartItems: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);
