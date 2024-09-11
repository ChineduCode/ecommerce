'use client'

import { BiSolidEdit } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";

export default function Profile(){
    const { data: session } = useSession()
    const { userInfo, setUserInfo } = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submited')
    }

    const handleOnChange = (e)=> {}

    return(
        <form className="profile-info-section" onSubmit={handleSubmit}>
            <div className="heading">
                <div className="img-container">
                    { session?.user?.image ? 
                        <img src={session.user.image} alt='user-avatar' /> 
                        : 
                        <FaRegUser /> 
                    }
                    <BiSolidEdit />
                </div>
                <div className="edit-btn">
                    <button className='btn'>Edit Profile</button>
                </div>
            </div>

            <div className="form-container">
                <input 
                    type="text" 
                    name="firstname"
                    defaultValue={session?.user?.firstname}
                    onChange={handleOnChange}
                />
                
            </div>
        </form>
    )
}
