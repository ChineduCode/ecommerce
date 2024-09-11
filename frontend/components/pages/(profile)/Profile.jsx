'use client'

import { FaEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ResponseMsg from "@/components/ResponseMsg";
import Loader from "@/components/Loader";

export default function Profile(){
    const { data: session, update } = useSession()
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [responseMsg, setResponseMsg] = useState(null)
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    })
    const [initialUserInfo, setInitialUserInfo] = useState({})
    const router = useRouter()

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

            setInitialUserInfo({
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
        setLoading(true)
        
        const updatedFields = Object.entries(userInfo).reduce((acc, [key, value])=> {
            if (value !== initialUserInfo[key]) {
                acc[key] = value;
            }

            return acc;
        }, {})

        if (Object.keys(updatedFields).length === 0) {
            console.log('No changes to submit');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile/update`,
                updatedFields,
                {
                    headers: {'Authorization': `Bearer ${session.accessToken}`}
                }
            )

            if(response.data){
                setStatus('success')
                setResponseMsg(response.data.message)
                update(updatedFields)
                router.refresh()
            }

        } catch (error) {
            setStatus('error')
            setResponseMsg(error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return(
        <form className="profile-info-section" onSubmit={handleSubmit}>
            <div className="heading">
                <div className="img-container">
                    { session?.user?.image ? 
                        <img src={session.user.image} alt='user-avatar' /> 
                        : 
                        <FaRegUser size={45}/> 
                    }
                    <div className="edit-icon">
                        <FaEdit size={23} />
                    </div>
                </div>
                <div className="edit-btn">
                    <button className='btn' onClick={(e)=> setEdit(!edit)} disabled={loading === true}>
                        <FaEdit size={22}/>
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>

            <div className="form-container">
                <input 
                    type="text" 
                    name="firstname"
                    className='firstname'
                    value={userInfo.firstname}
                    onChange={handleOnChange}
                    disabled={edit === false}
                />
                <input
                    type="text" 
                    name="lastname"
                    className='lastname'
                    value={userInfo.lastname}
                    onChange={handleOnChange}
                    disabled={edit === false}
                />
                <input 
                    type="tel" 
                    name="phone"
                    className='phone'
                    value={userInfo.phone}
                    onChange={handleOnChange}
                    disabled={edit === false}
                />
                <input 
                    type="email" 
                    name="email"
                    className='email'
                    value={userInfo.email}
                    onChange={handleOnChange}
                    disabled={edit === false}
                />
                <input 
                    type="text" 
                    name="address"
                    className='address'
                    value={userInfo.address}
                    onChange={handleOnChange}
                    disabled={edit === false}
                />
                <button 
                    type='submit' 
                    onSubmit={handleSubmit}
                    disabled={loading === true}
                    style={{backgroundColor: loading ? '#ccc' : null}}
                >
                    {loading ? <Loader /> : 'Save changes'}
                </button>
            </div>

            { status && <ResponseMsg setStatus={setStatus} status={status} responseMsg={responseMsg} />}
        </form>
    )
}
