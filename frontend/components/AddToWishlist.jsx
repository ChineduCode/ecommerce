'use client'

import { MdOutlineFavoriteBorder } from "react-icons/md";
import ResponseMsg from "./ResponseMsg";
import { useWishlist } from "@/utils/wishlistContext";

export default function AddToWishlist({productId}){
    const { state, addItemToWishlist } = useWishlist()

    const handleAddToWishlist = async () => {
        if (!productId) {
            console.error('ProductId not found');
            return;
        }
        await addItemToWishlist(productId);
    };

    return(
        <>
            <button 
                className='add-to-favourite' 
                onClick={handleAddToWishlist}
                disabled={state.loading}
            > 
                <MdOutlineFavoriteBorder size={22} />
            </button>

            { state.responseMsg && <ResponseMsg /> }
        </>
    )
}
