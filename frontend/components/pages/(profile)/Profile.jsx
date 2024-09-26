'use client'

import { FaEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useProfile } from "@/utils/context/profile/profileContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import ResponseMsg from "@/components/ResponseMsg";
import Loader from "@/components/Loader";
import Loading from "@/components/Loading";

export default function Profile(){
    const { data: session, status, update } = useSession()
    const { state, dispatch } = useProfile()
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
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

    useEffect(()=> {
        if (status === 'authenticated' && session?.user) {
            update(session).then(() => {
                console.log('Session updated');
            }).catch((error) => {
                console.error('Error updating session:', error);
            });
        }
    },[])
    
    // Update the userInfo state when session data is loaded
    useEffect(() => {
        if (session?.user) {
            setUserInfo({
                firstname: session.user.firstname || '',
                lastname: session.user.lastname || '',
                email: session.user.email || '',
                phone: session.user.phone || '',
                address: session.user.addresses && session.user.addresses.length > 0
                ? session.user.addresses.find(address => address.defaultAddress === true) || session.user.address[0] : ''
            })
        
            setInitialUserInfo({
                firstname: session.user.firstname || '',
                lastname: session.user.lastname || '',
                email: session.user.email || '',
                phone: session.user.phone || '',
                address: session.user.addresses && session.user.addresses.length > 0 
                ? session.user.addresses.find(address => address.defaultAddress === true) || session.user.addresses[0]
                : ''
            })
            dispatch({type: 'FETCH_PROFILE', payload: session.user})
        }
        //console.log(session)

    }, [session])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const updatedFields = Object.entries(userInfo).reduce((acc, [key, value])=> {
            if (value !== initialUserInfo[key]) {
                acc[key] = value;
            }

            return acc;
        }, {})

        if (Object.keys(updatedFields).length === 0) {
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
                dispatch({type: 'UPDATE_PROFILE', payload: response.data})
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

    if(status === 'loading') return <div style={{textAlign: 'center'}}> <Loading /> </div>

    return(
        <form className="profile-info-page" id='profile' onSubmit={handleUpdate}>
            <div className="heading">
                <div className="profile-img-container">
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
                    <button type="button" className='btn' onClick={(e)=> setEdit(!edit)} disabled={loading === true}>
                        <FaEdit size={22}/>
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>

            <div className="form-container">
                <div className="form-control">
                    <label htmlFor="firstname">First Name</label>
                    <input 
                        type="text" 
                        name="firstname"
                        className='firstname'
                        value={userInfo.firstname}
                        onChange={handleOnChange}
                        disabled={edit === false}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text" 
                        name="lastname"
                        className='lastname'
                        value={userInfo.lastname}
                        onChange={handleOnChange}
                        disabled={edit === false}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone"
                        className='phone'
                        value={userInfo.phone}
                        onChange={handleOnChange}
                        disabled={edit === false}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="Email">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        className='email'
                        value={userInfo.email}
                        onChange={handleOnChange}
                        disabled={edit === false}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        name="address"
                        className='address'
                        value={
                            `${userInfo?.address?.houseNo || ''} ${userInfo?.address?.street || ''} ${userInfo?.address?.city || ''}`
                        }
                        onChange={handleOnChange}
                        disabled //Disabled
                    />
                </div>
                
                <button 
                    type='submit' 
                    onSubmit={handleUpdate}
                    disabled={loading === true}
                    style={{backgroundColor: loading ? '#ccc' : null}}
                >
                    {loading ? <Loader /> : 'Save changes'}
                </button>
            </div>

            {/* { status && <ResponseMsg setStatus={setStatus} status={status} responseMsg={responseMsg} />} */}
        </form>
    )
}
