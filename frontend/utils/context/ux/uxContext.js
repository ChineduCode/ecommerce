'use client'

import { useContext, createContext, useReducer } from "react"
import { UXReducer } from "./uxReducer"

const initialState = {
    isModalOpen: false,
    isSideBarOpen: false,
    isCartOpen: false,
    loadingState: false,
    theme: 'light'
}

const UXContext = createContext()

export const UXProvider = ({children}) => {
    const [state, dispatch] = useReducer(UXReducer, initialState)

    return (
        <UXContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </UXContext.Provider>
    )
}

export const useUX = () => useContext(UXContext)
