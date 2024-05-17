import axios from 'axios'
import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    CHECK_TOKENVALIDATION_REQUEST, 
    CHECK_TOKENVALIDATION_SUCCESS,
    CHECK_TOKENVALIDATION_FAIL,
    CHECK_TOKENVALIDATION_RESET,
} from '../constants/userConstants';
import Cookies from 'js-cookie';

export const logout = () => (dispatch) => {
  Cookies.remove('admin'); 
  Cookies.remove('refreshToken');
  Cookies.remove('token');
  Cookies.remove('userinfo');
  dispatch({type: USER_LOGOUT});
}

export const checkValidToken = (token) => async (dispatch) => {
  dispatch({type: CHECK_TOKENVALIDATION_REQUEST});

  const response = await axios.post('https://localhost:7262/api/Authentication/check-token-validation', {
    token: token
  })

  console.log(response);

  if (response.data.flag) {
    dispatch({
      type: CHECK_TOKENVALIDATION_SUCCESS,
      payload: response.data.flag
    });
  } else {
    console.log("log out - token is not valid");
    dispatch(logout());
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
        
    dispatch({ type: USER_LOGIN_REQUEST });
  
    const response = await axios.post('https://localhost:7262/api/authentication/login', {
      email,
      password,
    }, { withCredentials: true });

    const response2 = await axios.post('https://localhost:7262/api/authentication/admin/login', {
      email: email,
      password: password,
    }, { withCredentials: true });
  
    console.log(response);
    console.log(response2);
  
    if (response.data.flag) {
      Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict', secure: true });
      Cookies.set('userinfo', JSON.stringify(response.data.data), { sameSite: 'Strict', secure: true });
        
      Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });

      if (response2.data.flag) {
        Cookies.set('admin', true, { sameSite: 'Strict', secure: true });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: response.data
        });
      }

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
