const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        toLowercase: true
    }
})

const NewsLetterSubscribers = mongoose.model('NewsLetterSubscribers', newsLetterSchema)

module.exports = NewsLetterSubscribers;
