const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 50,
            wtimeoutMS: 2500
        })
        console.log(`Connected to database`)

    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`)
        
        process.exit(1)
    }
}

module.exports = connectDB
