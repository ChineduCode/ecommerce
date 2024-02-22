'use client'

import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

export default function AddMinusBtn(){
    const [count, setCount] = useState(0)

    function increaseCount(){
        setCount(count + 1)
    }
    function decreaseCount(){
        if(count == 0) return
        setCount(count - 1)
    }

    return(
        <div className="add-minus-btn">
            <FaMinus size={20} onClick={decreaseCount}/>
            <span className='count'>{count}</span>
            <FaPlus size={20} onClick={increaseCount}/>
        </div>
    )
}