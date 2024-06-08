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

export const logout = (token) => async (dispatch) => {
  Cookies.remove('admin'); 
  Cookies.remove('refreshToken');
  Cookies.remove('token');
  Cookies.remove('userinfo');
  const response = await axios.post('https://localhost:7262/api/Authentication/check-token-validation', {
    token: token
  })

  Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });

  dispatch({type: USER_LOGOUT});
}

export const checkValidToken = (token) => async (dispatch) => {
  dispatch({ type: CHECK_TOKENVALIDATION_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('https://localhost:7262/api/Authentication/check-token-validation', {
      token: token
    }, config);

    console.log(response);

    if (response.data.flag) {
      console.log("The token is valid");
      dispatch({
        type: CHECK_TOKENVALIDATION_SUCCESS,
        payload: response.data.flag
      });
    } else {
      console.log("log out - token is not valid");

      try {
        const refresh = Cookies.get('refreshToken');
        const refreshResponse = await axios.post('https://localhost:7262/api/Authentication/refresh-token', {
          Token: refresh
        }, config);

        console.log(refreshResponse);
        Cookies.set('refreshToken', refreshResponse.data.refreshToken, { sameSite: 'Strict', secure: true });
        Cookies.set('userinfo', JSON.stringify(refreshResponse.data.data), { sameSite: 'Strict', secure: true });
        Cookies.set('token', refreshResponse.data.token, { sameSite: 'Strict', secure: true });

        dispatch(logout(token));
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError);
        dispatch({
          type: CHECK_TOKENVALIDATION_FAIL,
          payload: refreshError.message,
        });
      }
    }
  } catch (error) {
    console.error("Error during token validation:", error);
    dispatch({
      type: CHECK_TOKENVALIDATION_FAIL,
      payload: error.message,
    });
  }
}
export const login = (email, password) => async (dispatch) => {
  try {
    console.log("Enter Login process");
    dispatch({ type: USER_LOGIN_REQUEST });
  
    const response = await axios.post('https://localhost:7262/api/authentication/login', {
      email: email,
      password: password,
    }, { withCredentials: true });

    console.log(response);
    console.log(response.data.flag);
    // const decodedString = decodeURIComponent(response);
    // const jsonObject1 = JSON.parse(decodedString);
    // response =  JSON.parse(jsonObject1);

    // const response2 = await axios.post('https://localhost:7262/api/authentication/admin/login', {
    //   email: email,
    //   password: password,
    // }, { withCredentials: true });
  
    // console.log(response);
    // console.log(response2);
  
    if (response.data.flag) {
      console.log("Enter User Login Response");
      console.log(response.data.token);
      Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict', secure: true });
      Cookies.set('userinfo', JSON.stringify(response.data.data), { sameSite: 'Strict', secure: true });
      Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      });

      // if (response2.data.flag) {
      //   console.log("Enter Admin Login Response");
      //   Cookies.set('admin', true, { sameSite: 'Strict', secure: true });
      //   dispatch({
      //     type: USER_LOGIN_SUCCESS,
      //     payload: response.data
      //   });
      // } else {
      //   dispatch({
      //     type: USER_LOGIN_SUCCESS,
      //     payload: response.data
      //   });
      // }

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