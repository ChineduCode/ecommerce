import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchOrder = async () => {
    const session = await getSession()
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`, {
        headers: {'Authorization': `Bearer ${session.accessToken}`}
    })

    return response.data
}

export const createOrder = async (orderData) => {
    const session = await getSession()
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/create`, 
        {orderData},
        { headers: {'Authorization': `Bearer ${session.accessToken}`} }
    )

    return response.data
}