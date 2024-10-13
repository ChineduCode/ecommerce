const FETCH_ORDER = 'FETCH_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const LOADING = 'LOADING'
const ERROR = 'ERROR'

export default function orderReducer(state, action){
    switch (action.type) {
        case FETCH_ORDER:
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: false
            }

        case CREATE_ORDER:
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: false
            }

        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}
