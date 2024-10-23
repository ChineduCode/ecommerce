'use client'

import Link from "next/link"
import { FaLessThan } from "react-icons/fa6";
import { useState, useRef } from "react";

export default function OTP(){
    const [otp, setOTP] = useState('')
    const [error, setError] = useState(null)
    const [status, setStatus] = useState('')
    const inputRefs = useRef([]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const newOTP = [...otp];  // Convert OTP to an array
        newOTP[index] = value;    // Set the value at the correct index
        setOTP(newOTP.join(''));  // Convert back to a string and update state
    
        if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };    

    const handleOTP = async (e)=> {
        e.preventDefault()
        setStatus('submitting')

        try {
            if(!otp || otp.length < 6){
                throw new Error('Please fill all fields')
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/forgot-password/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({otp})
            })

            const data = await response.json()
            if(response.ok){
                setError('')
                setOTP('')
                setStatus('success')
            }else{
                throw new Error(data.message)
            }

        } catch (error) {
            setStatus('failed')
            setError(error.message)
            return
        }
    }

    return(
        <div className="otp">
            <div className="container">
                <div className="back-container"> <Link href='/forgot-password'><FaLessThan /> <span>Back</span></Link> </div>
                <div className="headers">
                    <h2 className="heading">Enter OTP</h2>
                    <p className="sub-heading">
                        We have sent an OTP to your registered email address
                    </p>
                </div>
                <form method='post' className="form-container" onSubmit={handleOTP}>
                    { error && <small className="error">{error}</small> }
                    <div className="form-control">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleInputChange(e, index)}
                                className="otp-input"
                            />
                        ))}
                    </div>
                    <button 
                        className="btn" 
                        onSubmit={handleOTP}
                        disabled={status === 'submitting'}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    )
}
