'use client'

import { useReducer, createContext, useContext } from "react"
import orderReducer from "./orderReducer"
import { fetchOrder, createOrder } from "./orderServices"

const initialState = {
    orders: null,
    loading: false,
    error: null
}

const OrderContext = createContext()

export const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, initialState)

    const loadOrder = async () => {
        dispatch({type: 'LOADING'})
        try {
            const data = await fetchOrder()
            dispatch({type: 'FETCH_ORDER', payload: data})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    const addOrder = async (orderData) => {
        dispatch({type: 'LOADING'})
        try {
            const data = await createOrder()
            dispatch({type: 'FETCH_ORDER', payload: data.orders})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.response.data.message})
        }
    }

    return (
        <OrderContext.Provider value={{
            state,
            dispatch,
            loadOrder,
            addOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => useContext(OrderContext)
