import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchCart = async () => {
    const session = await getSession()
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts`, { 
        headers: {'Authorization': `Bearer ${session.accessToken}`}
    })

    return response.data
}

export const addToCart = async (productId, qty) => {
    const session = await getSession()
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts/add`,
        {productId, qty},
        { headers: {'Authorization': `Bearer ${session.accessToken}`}}
    )

    return response.data
}

export const removeFromCart = async (productId) => {
    const session = await getSession()
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts/delete`,
        {itemId: productId},
        {headers: {'Authorization': `Bearer ${session.accessToken}`}}
    )

    return response.data
}
