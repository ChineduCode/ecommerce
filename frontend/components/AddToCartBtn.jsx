'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loader from "./Loader"
import { useState } from "react"
import { TiTimes } from "react-icons/ti";

export default function AddToCartBtn({ productID, qty }){
    const { data: session } = useSession()
    const [loading, setLoading] = useState(null)
    const [status, setStatus] = useState(null)
    const [responseMsg, setResponseMsg] = useState(null)
    const router = useRouter()

    const handleAddToCart = async (e)=> {
        //e.stopPropagation()
        if(!session){
            return router.push('/login')
        }

        try {
            if(!productID){
                throw new Error('No product id found')
            }

            setLoading(true)

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts/add-cart`,
                { productID, qty },
                {
                    headers: {
                        'Authorization' : `Bearer ${session.accessToken}`
                    }
                }
            )
  
            if(response.data){
                setStatus('success')
                setResponseMsg(response.data.message)
            }

        } catch (error) {
            setStatus('error')
            setResponseMsg(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const handleResponseMsg = ()=> {
        console.log('clicked')
        setStatus(null)
    }

    return(
        <div className="add-to-cart-btn"> 
            <button 
                className='btn'
                onClick={handleAddToCart}
                disabled={qty === 0 || loading === true}
                style={{ backgroundColor: (loading || qty===0) ? '#ccc' : null }}
            > 
                { loading ? <Loader /> : 'Add to Cart'}
            </button>

            {/* Response status */}
            {status 
                && 
                <div 
                    className="response-msg" 
                    style={{backgroundColor: status==='success' ? 'hsl(120, 70%, 50%)': status==='error' ? 'orangered': null}}
                    >
                        <span className="msg">{responseMsg}</span>
                        <TiTimes size={25} onClick={handleResponseMsg} />
                </div>
            }
        </div>
    )
}
