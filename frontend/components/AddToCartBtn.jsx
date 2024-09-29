'use client'

import { useRouter } from "next/navigation"
import Loader from "./Loader"
import ResponseMsg from "./ResponseMsg"
import { useCart } from "@/utils/context/cart/cartContext"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function AddToCartBtn({ productId, qty }){
    const { data: session } = useSession()
    const { state, addItemToCart } = useCart()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAddToCart = async ()=> {
        setLoading(true)
        if(!session){
            return router.push(`/login?callbackUrl=${window.location.href}`)
        }

        if(!productId){
            console.error('Product id not found')
        }

        await addItemToCart(productId, qty || 1)
        setLoading(false)
    }

    return(
        <>
            <button 
                className='btn'
                onClick={handleAddToCart}
                disabled={loading  || state.loading}
                style={{ backgroundColor: state.loading ? '#ccc' : null }}
            > 
                { loading ? <Loader /> : 'Add to Cart'}
            </button>

            {state.responseMsg && <ResponseMsg /> }
        </>
    )
}
