'use client'

import AddressForm from "@/components/AddressForm";
import { FaEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from 'react-icons/fa6'
import { useAuth } from "@/utils/context/auth/AuthContext";

export default function Address(){
    const { session } = useAuth()

    return(
        <div className="address-page">
            <div className="add-new-address-container">
                <button className="add-new-address">
                    <FaPlus />
                    <span>Add New Address</span>
                </button>
            </div>
            <div className="container">
                {session?.address}
            </div>
            <AddressForm />
        </div>
    )
}
