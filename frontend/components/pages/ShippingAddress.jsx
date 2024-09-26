"use client"

import AddressForm from "../AddressForm"
import { useUX } from "@/utils/context/ux/uxContext"
import { useProfile } from "@/utils/context/profile/profileContext"
import { getSession } from "next-auth/react"
import { FaPlus } from "react-icons/fa6"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function ShippingAddress(){
    const { state: stateUX, dispatch: dispatchUX } = useUX()
    const { data: session, status } = useSession()
    const [ addresses, setAddresses ] = useState([])

    useEffect(()=> {
        if(status === 'authenticated' && session?.user?.addresses){
            setAddresses(session.user.addresses)
        }
        console.log(addresses)
    },[session, status])

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

                {/* { session.user?.addresses?.length > 0 ?
                    <div className="addresses">
                        {session.user.addresses.map((address, index)=> (
                            <div className="addresses" key={index}>
                                <div className="content">
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
                    <div className="address-empty">No address found!!!</div>
                } */}

                <div className="deliver-btn">
                    <button 
                        onClick={()=> dispatchUX({ type: 'TOGGLE_MODAL' })}
                    > 
                        <FaPlus /> <span>Deliver Here</span> 
                    </button>
                </div>
            </div>
            { stateUX.isModalOpen && <AddressForm /> }
        </div>
    )
}
