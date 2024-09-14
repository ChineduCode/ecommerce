import { FaMinus, FaPlus } from "react-icons/fa6";
import { useCount } from "@/utils/context/count/countcontext";

export default function Count(){
    const { state, incrementQty, decrementQty } = useCount()

    const handleIncrement = ()=> {
        incrementQty()
    }
    
    const handleDecrement = ()=> {
        decrementQty()
    }

    return(
        <div className="count">
            <button onClick={handleDecrement} disabled={state.qty === 0}> <FaMinus size={22} /> </button>
            <span>{ state.qty }</span>
            <button onClick={handleIncrement}> <FaPlus size={22} /> </button>
        </div>
    )
}
