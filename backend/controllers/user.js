const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateJWT = require('../utils/generateToken')
const generateCode = require('../utils/generateCode')
const { 
    sendEmailVerification, 
    successEmailVerification, 
    sendOTP, 
    passwordReset, 
    successPasswordReset 
} = require('../utils/sendEmail')

const registerUser = asyncHandler(async (req, res)=> {
    try {
        const { firstname, lastname, email, phone, password, confirmPassword } = req.body.userData;
        
        if(!firstname || !lastname || !email || !phone || !password || !confirmPassword){
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmail.test(email)){
            return res.status(400).json({ message: 'Invalid email address' })
        }

        if(password.length < 8){
            return res.status(400).json({ message: 'Passwords must be atleast 7 characters' })
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        //Checking if user already exists
        const userExist = await User.findOne({ email })
        if(userExist){
            return res.status(400).json({ message: 'Email already exists' })
        }

        //Generate Verification Code
        const verificationCode = generateCode()
        
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //registering new user
        const user = new User({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            verificationCode
        })
        await user.save()
        
        //Sending the email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/?id=${encodeURIComponent(user._id)}&code=${encodeURIComponent(verificationCode)}`;
        sendEmailVerification(firstname, email, verificationLink);

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
})

const loginUser = asyncHandler(async (req, res)=> {
    try{
        const { email, password } = req.body
        
        if(!email || !password){
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmail.test(email)){
            return res.status(400).json({ message: 'Invalid email address' })
        }

        //Checking for the user
        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({ message: 'Invalid user credentials' })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            return res.status(401).json({ message: 'Invalid user credentials' })
        }

        return res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            address: user.address,
            token: generateJWT(user._id)
        })

    }catch (error){
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getAllUsers = asyncHandler(async (req, res)=> {
    try{
        const users = await User.find({}, {__v: 0, password: 0})
        return res.status(200).json(users)
        
    }catch (error){
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const getUserProfile = asyncHandler(async (req, res)=> {
    try{
        const user = await User.findById(req.user._id).populate('addresses').exec()
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            addresses: user.addresses
        })

    }catch (error){
        return res.status(200).json({ message: 'Internal server error' })
    }
})

const verifyUserEmail = asyncHandler(async (req, res) => {
    try {
        const {code, id} = req.query
        if(!code || !id){
            return res.status(400).json({message: 'Invalid verification link'})
        }
        
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        if(user.isVerified){
            return res.status(409).json({message: 'User is already verified'})
        }

        if(user.verificationCode !== code){
            return res.status(400).json({message: 'Invalid verification code'})
        }

        user.isVerified = true
        user.verificationCode = null
        await user.save()
        
        const loginLink = `${process.env.FRONTEND_URL}/login`
        await successEmailVerification(user.firstname, user.email, loginLink)

        return res.status(200).json({ message: 'Email succesfully verified' })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const sendUserOTP = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body
        if(!email){
            return res.status(400).json({ message: 'Email field is empty' })
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmail.test(email)){
            return res.status(400).json({ message: 'Invalid email addres' })
        }

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: 'User not found' })
        }

        const otp = generateCode()
        const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        user.otp = otp
        user.otpExpiry = otpExpiry
        await user.save()

        //send otp to the email
        await sendOTP(email, otp)
        return res.status(200).json({ message: 'OTP has been sent to your email' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const verifyUserOTP = asyncHandler(async (req, res)=> {
    try {
        const { otp } = req.body
        if(!otp){
            return res.status(400).json({message: 'No OTP found'})
        }

        const user = await User.findOne({ otp })
        if(!user || user.otpExpiry < Date.now()){
            return res.status(401).json({ message: 'Invalid OTP or expires OTP' })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()

        //Sending passwordResetLink if the otp match
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/?uniquecode=${user._id}`
        await passwordReset(user.email, resetLink)

        return res.status(200).json({ message: 'Password reset link sent to email' })

    } catch (error) {
        return res.status(500).json({ message: 'Error validating OTP' })
    }
})

const updateUserPassword = asyncHandler(async (req, res)=> {
    try {
        const uniquecode = req.query.uniquecode
        const { newPassword, confirmNewPassword } = req.body

        if(!uniquecode || !mongoose.Types.ObjectId.isValid(uniquecode)){
            return res.status(400).json({ message: 'Invalid unique code' })
        }

        if(!newPassword || !confirmNewPassword){
            return res.status(400).json({ message: 'Password is empty' })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        if(newPassword.length < 8){
            return res.status(400).json({ message: 'Password must be atlease 8 characters' })
        }

        const user = await User.findOne({_id: uniquecode})
        if(!user){
            return res.status(400).json({ message: 'Invalid unique code' })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()

        await successPasswordReset(user.email, user.firstname)

        return res.status(200).json({ message: 'Password successfully updated' })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const update = req.body
    const userID = req.user._id

    try {
        const user = await User.findById(userID)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userID, 
            update,
            {new: true, runValidators: true}
        )

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: 'Internal server error'})
    }

})

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    verifyUserEmail,
    sendUserOTP,
    verifyUserOTP,
    updateUserPassword,
    updateUser
}
