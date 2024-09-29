"use client"

import AddressForm from "../AddressForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import axios from "axios"

export default function ShippingAddress({handleNextStep}){
    const { data: session, status, update } = useSession()
    const [ addresses, setAddresses ] = useState([])

    useEffect(()=> {
        if(status === 'authenticated' && session?.user?.addresses){
            setAddresses(session.user.addresses)
        }
    },[session, status])

    const handleAddressDefaultChange = async (id) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/addresses/update`, 
                {addressId: id},
                {headers: {'Authorization': `Bearer ${session.accessToken}`}}
            )
            if(response.data){
                update(response.data.userData)
                setAddresses(session.user.addresses)
            }

        } catch (error) {
            console.error(error)
        }
    }

    if(status === 'loading') return <main style={{textAlign: 'center'}}>Loading...</main>

    return (
        <div className="shipping-address-step">
            <div className="containers">
                <h3 className="heading">Select a delivery address</h3>
                <div className="description">
                    Is the address you would like to use displayed below ? 
                    If so, click the corresponding "Deliver to this address" button. 
                    Or you can enter a new delivery address.
                </div>

                { addresses?.length > 0 ?
                    <div className="addresses-container">
                        {addresses.map((address, index)=> (
                            <div className="addresses" key={index}>
                                <div className="address">
                                    <div className="content">
                                        <div className="name">{address.street}</div>
                                        <div className="street">
                                            {`${address.houseNo} ${address.street} ${address.city}, ${address.state}, ${address.country} ${address.postalCode}`}
                                        </div>
                                        <div className="phone-container">
                                            <BiPhoneCall size={20}/> <span>{address.phone}</span>
                                        </div>
                                    </div>
                                    <form className="checkbox-container">
                                        <input 
                                            type="checkbox" 
                                            name="defaultAddress" 
                                            checked={address.defaultAddress}
                                            onChange={(e) => handleAddressDefaultChange(address._id)}
                                            className="checkbox-input" 
                                        />
                                    </form>
                                </div>

                                <div className="edit-delete-container">
                                    <div 
                                        className="edit"
                                        >
                                        <FaEdit size={20}/> <span>Edit</span>
                                    </div>
                                    <div 
                                        className="delete" 
                                        style={{backgroundColor: 'hsl(10, 100%, 85%)', color: 'orangered'}}
                                        onClick={()=> handleDelete(address._id)}
                                        >
                                        <TbTrash size={20}/> <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="address-empty">No address found!!!</div>
                }

                <div className="deliver-btn">
                    <button 
                        onClick={handleNextStep}
                    > 
                        Deliver to this Address 
                    </button>
                </div>
            </div>
            <AddressForm />
        </div>
    )
}
