const FETCH_PROFILE = 'FETCH_PROFILE'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const DELETE_PROFILE = 'DELETE_PROFILE'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const CLEAR_RESPONSE_MSG = 'CLEAR_RESPONSE_MSG'

export const profileReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload.profile,
                responseMsg: action.payload.message,
                loading: false,
                error: null
            }
        case DELETE_PROFILE:
            return {
                ...state,
                profile: action.payload.profile,
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
                error: action.payload,
                responseMsg: action.payload,
                loading: false
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
