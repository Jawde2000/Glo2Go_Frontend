import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,
    
    CHECK_TOKENVALIDATION_REQUEST,
    CHECK_TOKENVALIDATION_SUCCESS,
    CHECK_TOKENVALIDATION_FAIL,
    CHECK_TOKENVALIDATION_RESET,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        
        case USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload.data, token: action.payload.token, refreshToken: action.payload.refreshToken, message: action.payload.message}
        
        case USER_LOGIN_FAIL:
           return {loading: false, error: action.payload.message}

        case USER_LOGOUT:
           return {}

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        
        case USER_LIST_SUCCESS:
           return {loading: false, users: action.payload}
        
        case USER_LIST_FAIL:
           return {loading: false, error: action.payload}

        case USER_LIST_RESET:
           return {users:[]}

        default:
            return state
    }
}

export const userDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true}
        
        case USER_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_DELETE_FAIL:
           return {loading: false, error: action.payload}
        
        case USER_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const tokenValidationReducer = (state = { }, action) => {
    switch(action.type){
        case CHECK_TOKENVALIDATION_REQUEST:
            return {loading: true}
        
        case CHECK_TOKENVALIDATION_SUCCESS:
           return {loading: false, isValid: action.payload}
        
        case CHECK_TOKENVALIDATION_FAIL:
           return {loading: false, error: action.payload}

        case CHECK_TOKENVALIDATION_RESET:
           return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, payload: action.payload };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        case USER_REGISTER_RESET:
            return {};

        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
  
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true, message: action.payload };
  
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
  
      case USER_UPDATE_RESET:
        return {};
  
      default:
        return state;
    }
  };