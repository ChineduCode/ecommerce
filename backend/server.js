const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const app = express()

dotenv.config()
connectDB()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes
app.use('/api/users', require('./routes/user'))

//Routes
app.get('/', (req, res)=> res.send('Hello from e-commerce server !!!'))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
