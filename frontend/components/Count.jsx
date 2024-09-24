'use client'

import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Count({qty, setQty}){

    const incrementQty = ()=> {
        setQty(qty + 1)
    }

    const decrementQty = () => {
        setQty(qty - 1)
    }

    return(
        <div className="count">
            <button onClick={decrementQty} disabled={qty === 1}> <FaMinus size={22} /> </button>
            <span>{ qty }</span>
            <button onClick={incrementQty}> <FaPlus size={22} /> </button>
        </div>
    )
}
