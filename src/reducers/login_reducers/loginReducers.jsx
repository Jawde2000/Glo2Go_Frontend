import * as actions from "../../constants/login_constants/loginConstant";

export const LoginReducer = (state = { }, action) => {
    switch(action.type){
        case actions.LOGIN_REQUEST:
            return {loading: true}
        
        case actions.LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload, success: true}
        
        case actions.LOGIN_FAIL:
           return {loading: false, errorLogin: action.payload, success: false}

        case actions.LOGIN_RESET:
           return {}

        default:
            return state
    }
}