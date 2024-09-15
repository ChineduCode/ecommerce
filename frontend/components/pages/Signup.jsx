'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup(){
    const initialUserData = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    }
    const [ userData, setUserData ] = useState(initialUserData)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [agreed_terms_conditions, setAgreed_term_conditions] = useState(false)
    const [error, setError] = useState('')
    const [status, setStatus] = useState('')
    const router = useRouter()

    const handleOnChange = (e)=> {
        const { name, value } = e.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setStatus('submitting')

        try {
            if(
                !userData.firstname || 
                !userData.lastname ||
                !userData.email ||
                !userData.phone ||
                !userData.address ||
                !userData.password ||
                !userData.confirmPassword
            ){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(userDate.email)){
                throw new Error('Invalid email address')
            }

            if(userData.password.length < 8){
                throw new Error('Passwords must be atleast 7 characters')
            }
    
            if(userData.password !== userData.confirmPassword){
                throw new Error('Passwords do not match')
            }

            if(agreed_terms_conditions === false){
                throw new Error('Agree to the Terms & Conditions')
            }

            //I will still add the terms and conditions
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, { userData })
            if(response.data){
                setUserData(initialUserData)

                router.push('/login')
            }
            
        } catch (error) {
            setStatus('failed')
            setError(error.response.data.message)
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
                            onChange={handleOnChange}
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
                            value={userData.address}
                            onChange={handleOnChange}
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
                            name="confirm password" 
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
                            checked={agreed_terms_conditions}
                            onChange={(e)=> setAgreed_term_conditions(e.target.checked)}
                            className="terms-conditions" 
                        />
                        <span className="terms-conditions">
                            I agree to the <Link href="/terms-conditions"><strong>Terms & Conditions</strong></Link>
                        </span>
                    </div>

                    <button 
                        onClick={handleSubmit} 
                        className="btn"
                        disabled={status === 'submitting'}
                    >
                        Sign Up
                    </button>
                </form>

                <div className="signup-link">
                    <span>Already have an account ?</span>&nbsp; <Link href='/login'>Log in</Link>
                </div>
            </div>
        </div>
    )
}
