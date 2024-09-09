const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

dotenv.config()
connectDB()

// Configure CORS options
const corsOptions = {
    origin: [process.env.FRONTEND_URL], // Allow only your frontend domain
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // If you want to allow cookies or authorization headers
};

//Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes middleware
app.use('/api/v1/users', require('./routes/user'))
app.use('/api/v1/news', require('./routes/newsLetterSubscriber'))
app.use('/api/v1/products', require('./routes/product'))
app.use('/api/v1/carts', require('./routes/cart'))

//Routes
app.get('/', (req, res)=> res.send('Hello from e-commerce server !!!'))

app.use(errorHandler);
app.use('*', (req, res)=> res.status(404).json({message: `Route not found ${req.originalUrl}`}))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
