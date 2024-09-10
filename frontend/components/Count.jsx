import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Count({qty, setQty}){
    return(
        <div className="count">
            <button onClick={()=> setQty(qty - 1)} disabled={qty === 0}> <FaMinus size={22} /> </button>
            <span>{ qty }</span>
            <button onClick={()=> setQty(qty + 1)}> <FaPlus size={22} /> </button>
        </div>
    )
}
