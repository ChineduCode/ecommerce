'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PasswordUpdated from "../PassUpdateSuccess";
import { useSearchParams } from "next/navigation";

export default function NewPassword(){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [passUpdated, setPassUpdated] = useState(false)
    const [status, setStatus] = useState('')
    const searchParams = useSearchParams()
    const uniquecode = searchParams.get('uniquecode')

    const handleNewPassword = async (e)=> {
        e.preventDefault()
        setStatus('submitting')

        try {
            if(!password || !confirmPassword){
                throw new Error('Please fill all fields')
            }
            
            if(!uniquecode){
                throw new Error('Invalid unique code')
            }

            if(password.length < 8){
                throw new Error('Passwords must be atleast 7 characters')
            }
    
            if(password !== confirmPassword){
                throw new Error('Passwords do not match')
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update-password/?uniquecode=${uniquecode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: password,
                    confirmNewPassword: confirmPassword,
                })
            })
            
            const data = await response.json()
            if(response.ok){
                setPassword('')
                setConfirmPassword('')
                setError('')
                setPassUpdated(true)
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
        <div className="new-password">
            <div className="container">
                <div className="headers">
                    <h2 className="heading">Create New Password</h2>
                    <p className="sub-heading">Please enter your new password</p>
                </div>

                <form method="post" className="form-container" onSubmit={handleNewPassword}>
                    { error && <small className="error">{error}</small> }
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

                    <button 
                        onClick={handleNewPassword} 
                        className="btn"
                        disabled={status === 'submitting'}
                    >
                        Create New Password
                    </button>
                </form>
            </div>
            { passUpdated && <PasswordUpdated /> }
        </div>
    )
}
