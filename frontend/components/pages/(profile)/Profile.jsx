'use client'

import { BiSolidEdit } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";

export default function Profile(){
    const { data: session } = useSession()
    const [edit, setEdit] = useState(false)
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    })

    // Update the userInfo state when session data is loaded
    useEffect(() => {
        if (session) {
            setUserInfo({
                firstname: session.user.firstname || '',
                lastname: session.user.lastname || '',
                email: session.user.email || '',
                phone: session.user.phone || '',
                address: session.user.address ? session.user.address[0] : ''
            })
        }
    }, [session])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submitted')
    }

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
                    className='firstname'
                    value={userInfo.firstname}
                    onChange={handleOnChange}
                />
                <input
                    type="text" 
                    name="lastname"
                    className='lastname'
                    value={userInfo.lastname}
                    onChange={handleOnChange}
                />
                <input 
                    type="tel" 
                    name="phone"
                    className='phone'
                    value={userInfo.phone}
                    onChange={handleOnChange}
                />
                <input 
                    type="email" 
                    name="email"
                    className='email'
                    value={userInfo.email}
                    onChange={handleOnChange}
                />
                <input 
                    type="text" 
                    name="address"
                    className='address'
                    value={userInfo.address}
                    onChange={handleOnChange}
                />
            </div>
        </form>
    )
}
