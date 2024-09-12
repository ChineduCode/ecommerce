'use client'

import { createContext, useReducer, useContext } from 'react'

//Actions
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
const UPDATE_WISHLIST = 'UPDATE_WISHLIST'
const SET_WISHLIST = 'SET_WISHLIST'

const initialState = {
    item: []
}

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return { ...state, items: [...state.items, action.payload] }
        case REMOVE_FROM_WISHLIST:
            return { ...state, items: state.items.filter(item => item.id !== action.payload) }
        case UPDATE_WISHLIST:
            return { ...state, items: state.items.map(item => item.id === action.payload.id ? action.payload : item) }
        case SET_WISHLIST:
            return { ...state, items: action.payload}
        default:
            return state;
    }
}

//Create context
const WishlistContext = createContext()

//Provider component
export const WishlistProvider = ({children})=> {
    const [state, dispatch] = useReducer(wishlistReducer, initialState)

    return (
        <WishlistContext.Provider value={{state, dispatch}}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext);
