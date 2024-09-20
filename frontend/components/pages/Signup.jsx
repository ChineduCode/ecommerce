'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
import Loader from "../Loader";

export default function Signup(){
    const initialUserData = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    }
    const [ userData, setUserData ] = useState(initialUserData)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [agreedTermsConditions, setAgreedTermsConditions] = useState(false);
    const [error, setError] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e)=> {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setStatus('submitting')
        setLoading(true)
        try {
            if(
                !userData.firstname || 
                !userData.lastname ||
                !userData.email ||
                !userData.phone ||
                !userData.password ||
                !userData.confirmPassword
            ){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(userData.email)){
                throw new Error('Invalid email address')
            }

            if(userData.password.length < 8){
                throw new Error('Passwords must be atleast 7 characters')
            }
    
            if(userData.password !== userData.confirmPassword){
                throw new Error('Passwords do not match')
            }

            if(agreedTermsConditions === false){
                throw new Error('Agree to the Terms & Conditions')
            }

            //I will still add the terms and conditions
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, { userData })
            if(response.data){
                setUserData(initialUserData)
                setStatus('success')
            }
            
        } catch (error) {
            setStatus('failed')
            setError(error.response ? error.response.data.message : error.message)
        } finally {
            setLoading(false)
        }
    }

    if(status === 'success'){
        return <SignUpSuccess />
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
                            value={userData.firstname}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastname">Lastname</label>
                        <input 
                            type="text" 
                            name="lastname" 
                            className="lastname" 
                            value={userData.lastname}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="email" 
                            value={userData.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput
                            country={'us'}
                            value={userData.phone}
                            onChange={(value) => setUserData(prev => ({...prev, phone: value}))}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                className: 'phone'
                            }}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="password" 
                            className="password" 
                            value={userData.password}
                            onChange={handleOnChange}
                        />
                        { passwordVisible && <IoEyeOutline size={22} onClick={()=> setPasswordVisible(false)} /> }
                        { !passwordVisible && <IoEyeOffOutline size={22} onClick={()=> setPasswordVisible(true)} /> }
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm password">Confirm Password</label>
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="confirmPassword" 
                            className="confirm-password" 
                            value={userData.confirmPassword}
                            onChange={handleOnChange}
                        />
                        { passwordVisible && <IoEyeOutline size={22} onClick={()=> setPasswordVisible(false)} /> }
                        { !passwordVisible && <IoEyeOffOutline size={22} onClick={()=> setPasswordVisible(true)} /> }
                    </div>
                    <div className="form-control terms-conditions-container">
                        <input 
                            type="checkbox" 
                            name="terms & conditions" 
                            checked={agreedTermsConditions}
                            onChange={(e)=> setAgreedTermsConditions(e.target.checked)}
                            className="terms-conditions" 
                        />
                        <span className="terms-conditions">
                            I agree to the <Link href="/terms-conditions"><strong>Terms & Conditions</strong></Link>
                        </span>
                    </div>

                    <button 
                        className="btn"
                        disabled={status === 'submitting' || loading === true}
                        style={{backgroundColor: loading ? '#ccc' : null, padding: loading ? '12px': null}}
                    >
                        {loading ? <Loader /> : 'Sign Up'}
                    </button>
                </form>

                <div className="signup-link">
                    <span>Already have an account ?</span>&nbsp; <Link href='/login'>Log in</Link>
                </div>
            </div>
        </div>
    )
}


const SignUpSuccess = ()=> {
    return (
        <div className="signup-success">
            <div className="container">
                <div className="text">You have successfully registered!</div>
                <p>Please check your email to verify your account.</p>
            </div>
        </div>
    )
}
