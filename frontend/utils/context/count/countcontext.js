'use client'
import { createContext, useContext, useReducer } from "react"

const INCREMENT_COUNT = 'INCREMENT_COUNT'
const DECREMENT_COUNT = 'DECREMENT_COUNT'

const countReducer = (state, action)=> {
    switch (action.type) {
        case INCREMENT_COUNT:
            return {
                ...state,
                qty: state.qty + action.payload
            }
        case DECREMENT_COUNT:
            return {
                ...state,
                qty: state.qty - action.payload
            }
        default:
            return state;
    }
}

const initialState = {
    qty: 1
}

const CountContext = createContext();

export const CountProvider = ({children})=> {
    const [state, dispatch] = useReducer(countReducer, initialState)
    
    const incrementQty = ()=> {
        dispatch({ type: 'INCREMENT_COUNT', payload: 1 })
    }

    const decrementQty = ()=> {
        dispatch({type: 'DECREMENT_COUNT', payload: 1 })
    }

    return (
        <CountContext.Provider value={{
            state,
            incrementQty,
            decrementQty
        }}>
            {children}
        </CountContext.Provider>
    )
}

export const useCount = ()=> useContext(CountContext)
