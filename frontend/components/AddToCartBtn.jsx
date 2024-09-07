'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AddToCartBtn(){
    const { data: session } = useSession()

    const handleAddToCart = ()=> {
        !session ? redirect('/login') : null

        console.log('btn clicked')
    }

    return(
        <div className="add-to-cart-btn"> 
            <button 
                className='btn'
                onClick={handleAddToCart}
            > 
                Add to Cart
            </button> 
        </div>
    )
}
