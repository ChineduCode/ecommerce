'use client'

import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Signup(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSubmit = (e)=> {
        e.preventDefault()
        
        console.log({
            firstname,
            lastname,
            email,
            phone,
            address,
            password,
            confirmPassword
        })
    }

    return(
        <div className="signup">
            <div className="container">
                <div className="headers">
                    <h2 className="heading">Create New Account</h2>
                    <p className="sub-heading">Please enter details</p>
                </div>

                <form method="post" className="form-container" onSubmit={handleSubmit}>
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
                        <input 
                            type="text" 
                            name="phone" 
                            className="phone" 
                            value={phone}
                            onChange={(e)=> setPhone(e.target.value)}
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

                    <button onClick={handleSubmit} className="btn">Sign Up</button>
                </form>
            </div>
        </div>
    )
}
