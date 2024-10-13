'use client'

import { IoSearch } from "react-icons/io5"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import { useOrder } from "@/utils/context/order/orderContext"
import Link from 'next/link'

export default function Order(){
    const { data: session, status } = useSession()
    const { state, loadOrder } = useOrder()
    const [search, setSearch] = useState('')

    useEffect(()=> {
        loadOrder()
        console.log(state.orders)
    },[])

    const handleOrderFilter = (e) => {
        setSearch(e.target.value)
    }

    if(status === 'loading') return <div style={{width: '100%'}}> <Loading /> </div>

    return(
        <div className="order-page">
            <form className="filter-form">
                <input 
                    type="search" 
                    name="filter-order"
                    value={search}
                    onChange={handleOrderFilter}
                    placeholder="search"
                />
                <IoSearch size={22}/>
                <button type="submit">
                    <span>Filter</span>
                </button>
            </form>
            {state?.orders?.length > 0 ?
                <div className="orders-container">
                    {state.orders.map((order) => (
                        order.orderItems.map((ord, index) => (
                            <div className="order" key={index}>
                                <div className="product-container">
                                    <div className="img-container"> <img src={ord.product.image} alt="" /> </div>
                                    <div className="item-detail">
                                        <div className="product-name">{ord.product.name}</div>
                                        <div className="product-price">${ord.product.price}</div>
                                        <div className="qty">Quantity: {ord.quantity}</div>
                                    </div>
                                </div>
                                <div className="btn-container">
                                    <button className="view-order-link">
                                        <Link href={`/profile/orders/${order._id}`}>View Order</Link>
                                    </button>
                                    <button type="button" className="write-review-btn">Write A Review</button>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
                :
                <div className="empty-orders">You have no orders yet <br/>Continue shopping</div>
            }
        </div>
    )
}
