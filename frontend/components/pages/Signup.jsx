'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Signup(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [agreed_terms_conditions, setAgreed_term_conditions] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            if(
                !firstname || 
                !lastname ||
                !email ||
                !phone ||
                !address ||
                !password ||
                !confirmPassword
            ){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(email)){
                throw new Error('Invalid email address')
            }

            if(password.length < 8){
                throw new Error('Passwords must be atleast 7 characters')
            }
    
            if(password !== confirmPassword){
                throw new Error('Passwords do not match')
            }

            if(agreed_terms_conditions === false){
                throw new Error('Agree to the Terms & Conditions')
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phone,
                    address,
                    password,
                    confirmPassword,
                    agreed_terms_conditions
                })
            })
            
            const data = await response.json()
            if(response.ok){
                setFirstname('')
                setLastname('')
                setEmail('')
                setPhone('')
                setAddress('')
                setPassword('')
                setConfirmPassword('')
                setError('')
            }else{
                throw new Error(data.message)
            }
            
        } catch (error) {
            setError(error.message)
            return 
        }
    }

    return(
        <div className="signup">
            <div className="container">
                <div className="headers">
                    <h2 className="heading">Create New Account</h2>
                    <p className="sub-heading">Please enter details</p>
                </div>

                <form method="post" className="form-container" onSubmit={handleSubmit}>
                    { error && <small className="error">{error}</small> }
                    <div className="form-control">
                        <label htmlFor="firstname">Firstname</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            className="firstname" 
                            value={firstname}
                            onChange={(e)=> setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastname">Lastname</label>
                        <input 
                            type="text" 
                            name="lastname" 
                            className="lastname" 
                            value={lastname}
                            onChange={(e)=> setLastname(e.target.value)}
                        />
                    </div>
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
                    <div className="form-control">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput
                            country={'us'}
                            value={phone}
                            onChange={(phone)=> setPhone(phone)}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                className: 'phone'
                            }}
                            isValid={(value, country) => {
                                if (value.match(/12345/)) {
                                    return 'Invalid value: '+value+', '+country.name;
                                } else if (value.match(/1234/)) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            className="address" 
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="password" 
                            className="password" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        { passwordVisible && <IoEyeOutline size={22} onClick={()=> setPasswordVisible(false)} /> }
                        { !passwordVisible && <IoEyeOffOutline size={22} onClick={()=> setPasswordVisible(true)} /> }
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm password">Confirm Password</label>
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="confirm password" 
                            className="confirm-password" 
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                        { passwordVisible && <IoEyeOutline size={22} onClick={()=> setPasswordVisible(false)} /> }
                        { !passwordVisible && <IoEyeOffOutline size={22} onClick={()=> setPasswordVisible(true)} /> }
                    </div>
                    <div className="form-control terms-conditions-container">
                        <input 
                            type="checkbox" 
                            name="terms & conditions" 
                            checked={agreed_terms_conditions}
                            onChange={(e)=> setAgreed_term_conditions(e.target.checked)}
                            className="terms-conditions" 
                        />
                        <span className="terms-conditions">
                            I agree to the <Link href="/terms-conditions"><strong>Terms & Conditions</strong></Link>
                        </span>
                    </div>

                    <button onClick={handleSubmit} className="btn">Sign Up</button>
                </form>
            </div>
        </div>
    )
}
