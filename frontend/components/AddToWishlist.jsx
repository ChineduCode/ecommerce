'use client'

import { MdOutlineFavoriteBorder } from "react-icons/md";
import ResponseMsg from "./ResponseMsg";
import { useWishlist } from "@/utils/context/wishlist/wishlistContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToWishlist({ productId }){
    const { state, addItemToWishlist } = useWishlist()
    const { data: session } = useSession()
    const router = useRouter()

    const handleAddToWishlist = async () => {
        if(!session){
            return router.push(`/login?callbackUrl=${window.location.href}`)
        }

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
