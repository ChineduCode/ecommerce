'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [status, setStatus] = useState('')

    const router = useRouter()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setStatus('submitting')

        try {
            if(!email || !password){
                throw new Error('Please fill all fields')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(email)){
                throw new Error('Invalid email address')
            }

            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if(response.ok){
                setError('')
                setEmail('')
                setPassword('')
                setStatus('success')

                router.push('/')
            }else{
                throw new Error('Invalid credentials')
            }

        } catch (error) {
            setError(error.message)
            setStatus('failed')
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

                    <button 
                        onClick={handleSubmit} 
                        className="btn"
                        disabled={status === 'submitting'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
