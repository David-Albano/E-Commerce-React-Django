import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_RESET,

} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        
        // Login
        case USER_LOGIN_REQUEST:
            return {loading : true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        // Logout
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        
        // Register user 
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        
        // Get user details
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        case USER_DETAILS_RESET:
            return {user: {}}

        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {

        // Update User Profile 
        case PROFILE_UPDATE_REQUEST:
            return {loading: true}

        case PROFILE_UPDATE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}

        case PROFILE_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case PROFILE_UPDATE_RESET:
            return {}

        default:
            return state
    }
}