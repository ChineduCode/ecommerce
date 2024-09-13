'use client'

import { createContext, useReducer, useContext } from 'react'
import { wishlistReducer } from './wishlistReducer'
import { fetchWishlist, addToWishlist, removeFromWishlist } from './wishlistService'

const initialState = {
    items: [],
    loading: false,
    responseMsg: null,
    error: null
}

//Create context
const WishlistContext = createContext()

//Provider component
export const WishlistProvider = ({children})=> {
    const [state, dispatch] = useReducer(wishlistReducer, initialState)

    // Fetch wishlist
    const loadWishlist = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await fetchWishlist();
            dispatch({ type: 'SET_WISHLIST', payload: data.wishlistItems });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    };

    // Add item to wishlist
    const addItemToWishlist = async (productId) => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await addToWishlist(productId);
            dispatch({ type: 'ADD_TO_WISHLIST', payload: data });
        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR', payload: error.response.data.message });
        }
    };

    // Remove item from wishlist
    const removeItemFromWishlist = async (productId) => {
        dispatch({ type: 'LOADING' });
        try {
            await removeFromWishlist(productId);
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    };

    return (
        <WishlistContext.Provider value={{
            state, 
            dispatch,
            loadWishlist,
            addItemToWishlist,
            removeItemFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext);
