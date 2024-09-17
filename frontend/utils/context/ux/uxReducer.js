const TOGGLE_MODAL = 'TOGGLE_MODAL'
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
const TOGGLE_CART = 'TOGGLE_CART'
const SET_THEME = 'SET_THEME'
const SET_LOADING_STATE = 'SET_LOADING_STATE'

export const UXReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
                isSideBarOpen: false,
                isCartOpen: false
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSideBarOpen: !state.isSideBarOpen,
                isModalOpen: false,
                isCartOpen: false
            }
        case TOGGLE_CART:
            return {
                ...state,
                isCartOpen: !state.isCartOpen,
                isModalOpen: false,
                isSideBarOpen: false
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case SET_LOADING_STATE:
            return {
                ...state,
                loadingState: action.payload
            }
        default:
            return state;
    }
}
