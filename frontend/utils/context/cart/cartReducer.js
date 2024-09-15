const ADD_TO_CART = 'ADD_TO_CART'
const SET_CART = 'SET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const CLEAR_RESPONSE_MSG = 'CLEAR_RESPONSE_MSG'

export default function cartReducer(state, action){
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: action.payload.cart.cartItems,
                responseMsg: action.payload.message,
                totalQty: action.payload.cart.cartItems.length,
                totalPrice: action.payload.cart.cartItems.reduce((sum, cartItem)=> sum + (cartItem.product.price * cartItem.quantity), 0),
                loading: false,
                error: false
            }
        case SET_CART:
            return {
                ...state,
                items: action.payload,
                totalQty: action.payload.length,
                totalPrice: action.payload.reduce((sum, cartItem)=> sum + (cartItem.product.price * cartItem.quantity), 0),
                loading: false,
                error: false
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: action.payload.cart.cartItems,
                totalQty: action.payload.cart.cartItems.length,
                totalPrice: action.payload.cart.cartItems.reduce((sum, cartItem)=> sum + (cartItem.product.price * cartItem.quantity), 0),
                responseMsg: action.payload.message,
                loading: false,
                error: null
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                responseMsg: action.payload,
                error: action.payload
            }
        case CLEAR_RESPONSE_MSG:
            return {
                ...state,
                responseMsg: null
            }
        default:
            return state;
    }
}
