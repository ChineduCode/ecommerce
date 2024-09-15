const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    subCategory: {
        type: String,
        lowercase: true
    },
    brand: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
