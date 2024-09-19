'use client'

import AddressForm from "@/components/AddressForm";
import { FaEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import { FaPlus } from 'react-icons/fa6'
import { useAuth } from "@/utils/context/auth/AuthContext";
import { useUX } from "@/utils/context/ux/uxContext";
import { useEffect, useState} from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import { useProfile } from "@/utils/context/profile/profileContext";
import Link from "next/link";

export default function Address(){
    const { session } = useAuth()
    const { state: profileState, dispatch: profileDispatch } = useProfile()
    const { state: uxState, dispatch: uxDispatch } = useUX()
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const setAddress = ()=> {
            if(session?.user){
                profileDispatch({type: 'FETCH_PROFILE', payload: session.user})
            }
            setLoading(false)
        }

        setAddress()
    },[session])

    const handleDelete = async (addressId) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/addresses/delete`, 
                {
                  headers: {'Authorization': `Bearer ${session.accessToken}`},
                  data: { addressId }
                }
            )
            
            if(response.data){
                profileDispatch({type: 'UPDATE', payload: response.data})
            }

        } catch (error) {
            console.error(error)
        }
    }

    if(loading) return <div style={{width: '100%'}}> <Loading /> </div>

    return(
        <div className="address-page">
            <div className="add-new-address-container">
                <Link href='#address-form' className="add-new-address" onClick={()=> uxDispatch({type: 'TOGGLE_MODAL'})}>
                    <FaPlus />
                    <span>Add New Address</span>
                </Link>
                {/* <button className="add-new-address" onClick={()=> uxDispatch({type: 'TOGGLE_MODAL'})}>
                </button> */}
            </div>
            <div className="container">
                {profileState.profile?.addresses?.length > 0 ?
                    <div className="addresses">
                        {profileState.profile.addresses.map((address, index) => (
                            <div className="address-container" key={index}>
                                <div className="address">
                                    <div className="name">{address.street}</div>
                                    <div className="street">
                                        {`${address.houseNo} ${address.street} ${address.city}, ${address.state}, ${address.country} ${address.postalCode}`}
                                    </div>
                                    <div className="phone-container">
                                        <BiPhoneCall size={20}/> <span>{address.phone}</span>
                                    </div>
                                </div>

                                <div className="edit-delete-container">
                                    <div className="edit">
                                        <FaEdit size={20}/> <span>Edit</span>
                                    </div>
                                    <div 
                                        className="delete" 
                                        style={{backgroundColor: 'hsl(10, 100%, 85%)', color: 'orangered'}}
                                        onClick={()=> handleDelete(address._id)}>
                                        <TbTrash size={20}/> <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="address-empty">Your Address is Empty</div>
                }
            </div>
            { uxState.isModalOpen && <AddressForm /> }
        </div>
    )
}
