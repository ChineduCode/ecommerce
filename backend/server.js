const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

dotenv.config()
connectDB()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes
app.use('/api/v1/users', require('./routes/user'))
app.use('/api/v1/news', require('./routes/newsLetterSubscriber'))

//Routes
app.get('/', (req, res)=> res.send('Hello from e-commerce server !!!'))

app.use(errorHandler);
app.use('*', (req, res)=> res.status(404).json({message: 'Route not found'}))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
