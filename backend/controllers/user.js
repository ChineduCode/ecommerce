const Users = require('../models/user')
const bcrypt = require('bcryptjs')
const generateJWT = require('../utils/generateToken')

const registerUser = async (req, res)=> {
    try {
        const { firstname, lastname, email, phone, address, password, confirmPassword } = req.body;
        
        if(!firstname || !lastname || !email || !phone || !address || !password || !confirmPassword){
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
            return res.status(400).json({ message: 'Invalid email address' })
        }

        if(password.length < 8){
            return res.status(400).json({ message: 'Passwords must be atleast 7 characters' })
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        //Checking if user already exists
        const userExist = await Users.findOne({ email })
        if(userExist){
            return res.status(400).json({ message: 'Email already exists' })
        }
        
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //registering new user
        const user = new Users({
            firstname,
            lastname,
            email,
            phone,
            address,
            password: hashedPassword
        })

        await user.save().then(()=> console.log('User registered'))

        return res.status(200).json({ 
            message: 'User registered', 
            user: {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                token: generateJWT(user._id)
            }
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const loginUser = async (req, res)=> {
    try{
        const { email, password } = req.body
        
        if(!email || !password){
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
            return res.status(400).json({ message: 'Invalid email address' })
        }

        //Checking for the user
        const user = await Users.findOne({ email })
        if(!user){
            return res.status(401).json({ message: 'Invalid user credentials' })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            return res.status(401).json({ message: 'Invalid user credentials' })
        }

        return res.status(200).json({
            message: 'User logged In',
            user: {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                token: generateJWT(user._id)
            }
        })

    }catch (error){
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getAllUsers = async (req, res)=> {
    try{
        const users = await Users.find({}, {__v: 0, password: 0})
        return res.status(200).json(users)
        
    }catch (error){
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}
