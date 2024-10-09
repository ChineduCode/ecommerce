'use client'

import { IoSearch } from "react-icons/io5"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"

export default function Order(){
    const [orders, setOrders] = useState([])
    const { data: session } = useSession()

    useEffect(()=> {
        const fetchOrders = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`, {
                headers: {'Authorization': `Bearer ${session.accessToken}`}
            })
            if(response.data){
                setOrders(response.data)
                console.log(orders)
            }
        }

        fetchOrders()
    },[session])

    return(
        <div className="order-page">
            <div className="filter-container">
                <input type="search" name="filter" id="" />
            </div>
            {orders.length > 0 ?
                <div className="orders-container">Your Orders</div>
                :
                <div className="empty-orders">You have no orders yet</div>
            }
        </div>
    )
}
