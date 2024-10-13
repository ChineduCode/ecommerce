'use client'

import { IoSearch } from "react-icons/io5"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import { useOrder } from "@/utils/context/order/orderContext"

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
        console.log(search)
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
                    {state.orders.map((order, index) => (
                        <div className="order" key={index}>
                            <div className="product-container">
                                <div className="item-container">
                                    <div className="img-container"> <img src={order} alt="" /> </div>
                                </div>
                            </div>
                            <div className="btns-container"></div>
                        </div>
                    ))}
                </div>
                :
                <div className="empty-orders">You have no orders yet <br/>Continue shopping</div>
            }
        </div>
    )
}
