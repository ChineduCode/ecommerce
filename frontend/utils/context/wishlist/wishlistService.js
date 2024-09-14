import axios from "axios"
import { getSession } from 'next-auth/react'

export const fetchWishlist = async ()=> {
    const session = await getSession()
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlists`, {
        headers: {'Authorization': `Bearer ${session?.accessToken}`}
    })

    return response.data
}

export const addToWishlist = async (productId)=> {
    const session = await getSession()
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlists/add`, 
        {productId},
        { headers: {'Authorization': `Bearer ${session?.accessToken}` }}
    )

    return response.data
}

export const removeFromWishlist = async (productId) => {
    const session = await getSession()
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlists/delete`,
        {itemId: productId},
        { headers: {'Authorization': `Bearer ${session?.accessToken}` }}
    )

    return response.data
}
