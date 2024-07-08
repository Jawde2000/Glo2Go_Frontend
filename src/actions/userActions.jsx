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

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,
} from '../constants/userConstants';
import Cookies from 'js-cookie';
import { alertClasses } from '@mui/material';

export const logout = (token) => async (dispatch) => {
  Cookies.remove('admin'); 
  Cookies.remove('refreshToken');
  Cookies.remove('token');
  Cookies.remove('userinfo');
  localStorage.removeItem('persist:root');
  // const response = await axios.post('https://localhost:7262/api/Authentication/check-token-validation', {
  //   token: token
  // })

  // Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });

  dispatch({type: USER_LOGOUT});
}

export const checkValidToken = (token) => async (dispatch) => {
  dispatch({ type: CHECK_TOKENVALIDATION_REQUEST });

  if (token === null) {
    return dispatch({
      type: CHECK_TOKENVALIDATION_RESET,
    });
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(token);
  
  try {
    const response = await axios.post('https://localhost:7262/api/Authentication/check-token-validation', {
      token
    }, );

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

    const response2 = await axios.post('https://localhost:7262/api/authentication/admin/login', {
      email: email,
      password: password,
    }, { withCredentials: true });

    if (response2.data.flag) {
      const response = await axios.post('https://localhost:7262/api/authentication/login', {
        email: email,
        password: password,
      }, { withCredentials: true });
      console.log(response2);
      console.log("Enter Admin Login Response");
      console.log(response.data.token);
      Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict', secure: true });
      Cookies.set('userinfo', JSON.stringify(response.data.data), { sameSite: 'Strict', secure: true });
      Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });
      Cookies.set('admin', true, { sameSite: 'Strict', secure: true });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      });
      return;
    }
  } catch (error) {
    try {
      console.log("Enter User Login Response");
      console.log(email, password);
      const response = await axios.post('https://localhost:7262/api/authentication/login', {
        email: email,
        password: password,
      }, { withCredentials: true });

      console.log(response);
      console.log(response.data.flag);
      // const decodedString = decodeURIComponent(response);
      // const jsonObject1 = JSON.parse(decodedString);
      // response =  JSON.parse(jsonObject1);
    
      console.log(response);
    
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
      }
    } catch (error) {
      console.error("Error during login:", error.response);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message
      });
    }
  }
};

export const register = (email, password, confirmPassword) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  const config = {
    headers: {
        'Content-Type': 'application/json',
    },
  };

  try {
    console.log(password, confirmPassword);
      const response = await axios.post('https://localhost:7262/api/authentication/register', {
          Email: email,
          Password: password,
          ConfirmPass: confirmPassword,
      }, config);

      console.log(response);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
      dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response?.data?.message || error.message,
      });
      console.error("Error during registration:", error);
  }
};

export const registerAdmin = (email, password, confirmPassword, isAdmin) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  console.log("Enter Register admin");
  console.log(isAdmin);
  const role = isAdmin ? 1 : 2;
  console.log(role);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('https://localhost:7262/api/authentication/register-admin', {
      Email: email,
      Password: password,
      ConfirmPass: confirmPassword,
      role: role // Ensure 'role' is correctly assigned and sent
    }, config);

    console.log(response);
    console.log(response.data.flag);
    if (response.data.flag) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
    } else if (!response.data.flag) {
      dispatch({ type: USER_REGISTER_FAIL, payload: response.data });
    }

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Error during registration:", error);
  }
};


export const updateUserProfile = (userUpdateDTO) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    console.log(userUpdateDTO);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('https://localhost:7262/api/Authentication/updateTraveler', {
      firstName: userUpdateDTO.FirstName,
      lastName: userUpdateDTO.LastName,
      profilePic: userUpdateDTO.FirstName,
      travelerEmail: userUpdateDTO.TravelerEmail,
      gender: userUpdateDTO.Gender
    }, config);

    console.log(data)

    if (data.flag) {
      dispatch({type: USER_UPDATE_RESET, message: data.message});
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};