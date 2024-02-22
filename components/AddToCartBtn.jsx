'use client'

import { FaCartShopping } from 'react-icons/fa6'
//import { useState } from 'react'

export default function AddToCartBtn({ product }){
    return(
        <button disabled={product.countInStock === 0} className="add-to-cart-btn">
            <FaCartShopping />
            <span>Add to cart</span>
        </button>
    )
}