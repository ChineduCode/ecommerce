'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from '@/utils/context/cart/cartContext';
import { useWishlist } from '@/utils/context/wishlist/wishlistContext';

const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
    const [responseMsg, setResponseMsg] = useState(null);
    const [error, setError] = useState(null);

    const { state: cartState } = useCart();
    const { state: wishlistState } = useWishlist();

    // Monitor cart and wishlist errors or success messages
    useEffect(() => {
        const handleResponseMsg = async()=> {

            if (cartState.error || wishlistState.error || cartState.successMsg || wishlistState.successMsg) {
                removeResponse(); // Reset the message
            }
            
            if (cartState.error) {
                setResponseMsg(cartState.responseMsg);
                setError(true);
            } else if (wishlistState.error) {
                setResponseMsg(wishlistState.responseMsg);
                setError(true);
            } else if (cartState.responseMsg) {
                setResponseMsg(cartState.responseMsg);
                setError(false);
            } else if (wishlistState.responseMsg) {
                setResponseMsg(wishlistState.responseMsg);
                setError(false);
            }

            if(responseMsg){
                setResponseMsg(null)
                setError(null)
            }
        }

        handleResponseMsg();

    }, [cartState, wishlistState]);

    const removeResponse = () => {
        setResponseMsg(null);
        setError(null);
    };

    return (
        <ResponseContext.Provider value={{ responseMsg, error, removeResponse }}>
            {children}
        </ResponseContext.Provider>
    );
};

export const useResponse = () => useContext(ResponseContext);
