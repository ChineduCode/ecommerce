'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e)=> {
        e.preventDefault()
        
        console.log({
            email,
            password,
            rememberMe
        })
    }

    return(
        <div className="login">
            <div className="container">
                <div className="headers">
                    <h2 className="heading">Welcome back!!!</h2>
                    <p className="sub-heading">Please login here</p>
                </div>

                <form method="post" className="form-container" onSubmit={handleSubmit}>
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
                    <div className="form-control checkbox-container">
                        <input 
                            type="checkbox" 
                            name="remember me" 
                            checked={rememberMe}
                            onChange={(e)=> setRememberMe(e.target.checked)}
                            className="remember-me" 
                        />
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