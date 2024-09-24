'use client'

import { useContext, createContext, useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";
import { fetchCart, addToCart, removeFromCart, updateCart } from "./cartSevices";

const initialState = {
    items: [],
    loading: false,
    responseMsg: null,
    totalQty: 0,
    totalPrice: 0,
    error: null
}

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [state, dispatch ] = useReducer(cartReducer, initialState);

    // Automatically clear responseMsg after 3 seconds
    useEffect(() => {
        if (state.responseMsg) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_RESPONSE_MSG' });
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or state change
        }
    }, [state.responseMsg]);

    //Fetch Cart
    const loadCart = async () => {
        dispatch({ type: 'LOADING' })
        try {
            const data = await fetchCart()
            dispatch({ type: 'SET_CART', payload: data.cartItems })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.response.data.message })
        }
    }

    //Add To Cart
    const addItemToCart = async (productId, qty)=> {
        dispatch({ type: 'LOADING' })
        try {
            const data = await addToCart(productId, qty)
            dispatch({ type: 'ADD_TO_CART', payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.response.data.message })
        }
    }

    //Remove From Cart
    const removeItemFromCart = async (productId)=> {
        dispatch({ type: 'LOADING' })
        try {
            const data = await removeFromCart(productId)
            dispatch({ type: 'REMOVE_FROM_CART', payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.response.data.message })
        }
    } 

    //Update userCart
    const updateUserCart = async (updatedCart) => {
        dispatch({ type: 'LOADING' })
        try {
            const data = await updateCart(updatedCart)
            dispatch({ type: 'UPDATE_CART', payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.response.data.message })
        }
    }

    return (
        <CartContext.Provider value={{
            state,
            dispatch,
            addItemToCart,
            loadCart,
            removeItemFromCart,
            updateUserCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
