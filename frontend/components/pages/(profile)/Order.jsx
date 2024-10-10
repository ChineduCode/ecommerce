'use client'

import { IoSearch } from "react-icons/io5"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import { useOrder } from "@/utils/context/order/orderContext"

export default function Order(){
    const { data: session } = useSession()
    const { state, loadOrder } = useOrder()

    useEffect(()=> {
        loadOrder()
        console.log(state.orders)
    },[])

    return(
        <div className="order-page">
            <div className="filter-container">
                <input type="search" name="filter" id="" />
            </div>
            {state?.orders?.length > 0 ?
                <div className="orders-container">Your Orders</div>
                :
                <div className="empty-orders">You have no orders yet</div>
            }
        </div>
    )
}
