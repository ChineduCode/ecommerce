const CREATE_USER = 'CREATE_USER'
const GET_USERS = 'GET_USERS'
const GET_A_USER = 'GET_A_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const CLEAR_RESPONSE_MSG = 'CLEAR_RESPONSE_MSG'

export const userReducer = (state, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: action.payload.user,
                responseMsg: action.payload.message,
                Loading: false,
                error: null
            }
        case GET_USERS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }
        case GET_A_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload.user,
                responseMsg: action.payload.message,
                loading: false,
                error: null
            }
        case DELETE_USER:
            return {
                ...state,
                user: action.payload.user,
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
