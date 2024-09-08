import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Count({count, setCount, qtyIsZero}){

    return(
        <div className="count">
            <button onClick={()=> setCount(count - 1)} disabled={count === 0}> <FaMinus size={22} /> </button>
            <span>{ count }</span>
            <button onClick={()=> setCount(count + 1)}> <FaPlus size={22} /> </button>
        </div>
    )
}
