//Actions
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
const SET_WISHLIST = 'SET_WISHLIST'
const LOADING = 'LOADING'
const ERROR = 'ERROR'

export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {  
                ...state,
                items: action.payload.wishlist.wishlistItems,
                responseMsg: action.payload.message,
                loading: false,
                error: null
            }
        case REMOVE_FROM_WISHLIST:
            return { 
                ...state, 
                items: action.payload.wishlist.wishlistItems,
                responseMsg: action.payload.message,
                loading: false,
                error: null
            }
        case SET_WISHLIST:
            return { 
                ...state, 
                items: action.payload,
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
        default:
            return state;
    }
}
