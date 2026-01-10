import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from "../types/authTypes.js";

const initialState = {
    username: "",
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.name,
                token: action.payload.token,
                isLoading: false,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}
export default authReducer;