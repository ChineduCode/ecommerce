const express = require('express')
const router = express.Router()
const { subscribeToNews, getAllSubscribers } = require('../controllers/newsLetterSubscriber')

router.post('/subscribe', subscribeToNews)
router.get('/subscribers', getAllSubscribers)

module.exports = router
