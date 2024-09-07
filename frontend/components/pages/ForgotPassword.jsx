'use client'

import Link from "next/link"
import { FaLessThan } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [status, setStatus] = useState('')
    const router = useRouter()

    const sendOTP = async (e)=> {
        e.preventDefault()
        setStatus('submitting')

        try {
            if(!email){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(email)){
                throw new Error('Invalid email address')
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/forgot-password/send-otp`, { email })
            const data = response.data
            console.log(data)
            setError('')
            setEmail('')
            setStatus('success')
            router.push('/otp-verification')

        } catch (error) {
            setStatus('failed')
            setError(error.message)
            return
        }
    }

    return(
        <div className="forgot-password">
            <div className="container">
                <div className="back-container"> <Link href='/login'><FaLessThan /> <span>Back</span></Link> </div>
                <div className="headers">
                    <h2 className="heading">Forgot Password</h2>
                    <p className="sub-heading">
                        Enter your registered email. We'll send you a code to reset your password
                    </p>
                </div>
                <form method='post' className="form-container" onSubmit={sendOTP}>
                    { error && <small className="error">{error}</small> }
                    <div className="form-control">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <button className="btn" onSubmit={sendOTP}>Send OTP</button>
                </form>
            </div>
        </div>
    )
}
