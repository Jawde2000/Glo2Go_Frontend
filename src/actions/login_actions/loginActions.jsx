import * as actions from '../../constants/login_constants/loginConstant'
import axios from axios;

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: actions.LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }
        
        console.log("pass user insert login data")
        console.log(email)
        console.log(password)

        var { data } = await axios.post(
            'http://localhost:5000/login',
            {
                "email": email,
                "password": password,
            },
            config
        )   

        const configuration = {
            headers: {
                'Content-type' : 'application/json',
            }
        }
        
        if(data){
            dispatch({
                type: actions.LOGIN_SUCCESS,
                payload: data
            })

            
            
            //set user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
    }catch(error){
        dispatch({
            type: actions.LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}