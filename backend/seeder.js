const User = require('./models/user')
const Product = require('./models/product')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const products = require('./data/products')

dotenv.config()
connectDB()

const importData = async ()=> {
    try {
        const admin = await User.findOne({isAdmin: true})

        const sampleProducts = products.map(product => {
            return {...product, user: admin}
        })

        await Product.insertMany(sampleProducts)
        console.log('Product imported')
        process.exit()
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

importData()
