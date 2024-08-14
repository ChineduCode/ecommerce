'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            if(!email || !password){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(email)){
                throw new Error('Invalid email address')
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer your-token-here', // Example of setting an Authorization header
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()
            if(response.ok){
                setError('')
                setEmail('')
                setPassword('')
            }else{
                throw new Error(data.message)
            }

        } catch (error) {
            setError(error.message)
            return
        }
    }

    return(
        <div className="login">
            <div className="container">
                <div className="headers">
                    <h2 className="heading">Welcome back!!!</h2>
                    <p className="sub-heading">Please login here</p>
                </div>

                <form method="post" className="form-container" onSubmit={handleSubmit}>
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
                    <div className="form-control remember-container">
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                name="remember me" 
                                checked={rememberMe}
                                onChange={(e)=> setRememberMe(e.target.checked)}
                                className="checkbox" 
                            />
                            <label htmlFor="remember me">Remember Me</label>
                        </div>

                        <span className="forgot-password">
                            <Link href="/forgot-password">Forgot Password ?</Link>
                        </span>
                    </div>

                    <button onClick={handleSubmit} className="btn">Login</button>
                </form>
            </div>
        </div>
    )
}
