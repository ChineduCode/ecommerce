import { TiTimes } from "react-icons/ti";
import { useWishlist } from "@/utils/wishlistContext";

export default function ResponseMsg(){
    const { state, dispatch } = useWishlist()

    const handleResponseMsg = ()=> {
        dispatch({ type: 'ERROR', payload: null })
    }

    return(
        <div
            className="response-msg" 
            style={{backgroundColor: state.error ? 'orangered' : 'hsl(120, 70%, 50%)' }}
            >
                <span className="msg">{state.responseMsg}</span>
                <TiTimes size={25} onClick={handleResponseMsg} />
        </div>
    )
}
