'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { createUser, getUsers, getById, updateUser, deleteUser } from './userServices'

const initialState = {
    user: null,
    responseMsg: null,
    loading: false,
    error: null
}

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    
    useEffect(()=> {
        const timer = setTimeout(()=> {
            dispatch({type: 'CLEAR_RESPONSE_MSG'})
        }, 3000)

        return ()=> clearTimeout(timer)
    },[state.responseMsg])

    const addUser = async () => {
        dispatch({type: 'LOADING'})
        try {
            const data = await createUser()
            dispatch({type: 'CREATE_USER', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR'})
        }
    }

    const getAllUser = async ()=> {
        dispatch({type: 'LOADING'})
        try {
            const data = await getUsers()
            dispatch({type: 'GET_USERS', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    const getUser = async (userId)=> {
        dispatch({type: 'LOADING'})
        try {
            const data = await getById(userId)
            dispatch({type: 'GET_A_USER', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    const updUser = async (userId, userData) => {
        dispatch({type: 'LOADING'})
        try {
            const data = await updateUser(userId, userData)
            dispatch({type: 'UPDATE_USER', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    const deleteUser = async (userId) => {
        dispatch({type: 'LOADING'})
        try {
            const data = await updateUser(userId)
            dispatch({type: 'DELETE_USER', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    return (
        <UserContext.Provider value={{
            state,
            dispatch,
            addUser,
            getAllUser,
            getUser,
            updUser,
            deleteUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
