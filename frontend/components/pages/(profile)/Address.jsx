'use client'

import AddressForm from "@/components/AddressForm";
import { FaEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from 'react-icons/fa6'
import { useAuth } from "@/utils/context/auth/AuthContext";
import { useUX } from "@/utils/context/ux/uxContext";

export default function Address(){
    const { session } = useAuth()
    const { state, dispatch } = useUX()

    return(
        <div className="address-page">
            <div className="add-new-address-container">
                <button className="add-new-address" onClick={()=> dispatch({type: 'TOGGLE_MODAL'})}>
                    <FaPlus />
                    <span>Add New Address</span>
                </button>
            </div>
            <div className="container">
                {session?.address}
            </div>
            { state.isModalOpen && <AddressForm /> }
        </div>
    )
}
