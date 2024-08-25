const NewsLetterSubscribers = require('../models/newsLetterSubscriber')

const subscribeToNews = async (req, res)=> {
    try {
        const { email } = req.body

        if(!email){
            return res.status(400).json({ message: 'Email field is empty' })
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
            return res.status(400).json({ message: 'Invalid email address' })
        }

        const emailExists = await NewsLetterSubscribers.findOne({email})
        if(emailExists){
            return res.status(400).json({ message: 'Email already exists' })
        }

        const subscriber = new NewsLetterSubscribers({ email })
        await subscriber.save()
        return res.status(200).json({ message: 'News letter subscription successful' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getAllSubscribers = async (req, res)=> {
    try {
        const subscribers = await NewsLetterSubscribers.find({})
        return res.status(200).json(subscribers)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    subscribeToNews,
    getAllSubscribers
}
