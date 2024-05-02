import axios from 'axios'
import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,
} from '../constants/userConstants';
import Cookies from 'js-cookie';

export const logout = () => (dispatch) => {
    dispatch({type: USER_LOGOUT})
}

export const login = (email, password) => async (dispatch) => {
    try {
        
        dispatch({ type: USER_LOGIN_REQUEST });
  
        const response = await axios.post('https://localhost:7262/api/authentication/login', {
            email,
            password,
        }, { withCredentials: true });
  
        console.log(response);
  
        if (response.data.flag) {
            Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict', secure: true });
            Cookies.set('userinfo', JSON.stringify(response.data.data), { sameSite: 'Strict', secure: true });
            Cookies.set('admin', false, { sameSite: 'Strict', secure: true });
            Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });
  
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: response.data.data
        });

        alert(response.data.message);
      } else {
        dispatch({ type: USER_LOGIN_FAIL, payload: response.data.message });
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.response);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message
      });
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  };
