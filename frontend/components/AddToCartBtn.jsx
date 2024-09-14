'use client'

import { useRouter } from "next/navigation"
import Loader from "./Loader"
import ResponseMsg from "./ResponseMsg"
import { useAuth } from "@/utils/context/auth/AuthContext"
import { useCart } from "@/utils/context/cart/cartContext"
import { useCount } from "@/utils/context/count/countcontext"
import { useState } from "react"

export default function AddToCartBtn({ productId }){
    const { session } = useAuth()
    const { state, addItemToCart } = useCart()
    const { state: { qty }} = useCount()
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

        await addItemToCart(productId, qty)
        setLoading(false)
    }

    return(
        <> 
            <button 
                className='btn'
                onClick={handleAddToCart}
                disabled={state.qty === 0 || loading  || state.loading}
                style={{ backgroundColor: (state.loading || state.qty===0) ? '#ccc' : null }}
            > 
                { loading ? <Loader /> : 'Add to Cart'}
            </button>

            {state.responseMsg && <ResponseMsg /> }
        </>
    )
}
