'use client'

import { MdOutlineFavoriteBorder, MdSettingsInputAntenna } from "react-icons/md";
import ResponseMsg from "./ResponseMsg";
import { useState } from 'react'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToWishlist({productId}){
    const {data: session} = useSession()
    const [status, setStatus] = useState(null)
    const [responseMsg, setResponseMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAddToWishlist = async () => {
        if(!session){
            return router.push(`/login?callbackUrl=${window.location.href}`)
        }

        try {
            if(!productId){
                throw new Error('ProductId not found')
            }

            setLoading(true)

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlists/add`, 
                {productId},
                { headers: {'Authorization': `Bearer ${session.accessToken}` }}
            )

            if(response.data){
                setStatus('success')
                setResponseMsg(response.data.message)
            }
            
        } catch (error) {
            setStatus('error')
            setResponseMsg(error.response.data.message)
            console.error(error)
        } finally{
            setLoading(false)
        }
    }

    return(
        <>
            <button 
                className='add-to-favourite' 
                onClick={handleAddToWishlist}
                disabled={loading === true}
            > 
                <MdOutlineFavoriteBorder size={22} />
            </button>

            { status && 
                <ResponseMsg setStatus={setStatus} status={status} responseMsg={responseMsg} /> 
            }
        </>
    )
}
