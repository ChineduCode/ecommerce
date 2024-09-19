'use client'

import { useEffect, createContext, useContext, useReducer } from "react"
import { profileReducer } from "./profileReducer"
import { useAuth } from "../auth/AuthContext"

const initialState = {
    profile: null, // Start with null and update it once session is available
    responseMsg: null,
    error: null,
    loading: false
}

const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
    const [state, dispatch] = useReducer(profileReducer, initialState)

    useEffect(() => {
        if (state.responseMsg) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_RESPONSE_MSG' })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [state.responseMsg])

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)
