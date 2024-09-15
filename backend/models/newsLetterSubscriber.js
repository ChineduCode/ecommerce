const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        toLowercase: true
    }
})

module.exports = mongoose.model('NewsLetterSubscribers', newsLetterSchema)
