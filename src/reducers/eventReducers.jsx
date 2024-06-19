import {
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_CREATE_RESET,
    EVENT_GET_REQUEST,
    EVENT_GET_SUCCESS,
    EVENT_GET_FAIL,
    EVENT_GET_RESET,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_RESET,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_RESET,
  } from '../constants/eventConstants';
  
  export const eventCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_CREATE_REQUEST:
        return { loading: true };
      case EVENT_CREATE_SUCCESS:
        return { loading: false, success: true, event: action.payload };
      case EVENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const eventGetReducer = (state = { events: [] }, action) => {
    switch (action.type) {
      case EVENT_GET_REQUEST:
        return { loading: true, events: [] };
      case EVENT_GET_SUCCESS:
        return { loading: false, events: action.payload };
      case EVENT_GET_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_GET_RESET:
        return { events: [] };
      default:
        return state;
    }
  };
  
  export const eventUpdateReducer = (state = { event: {} }, action) => {
    switch (action.type) {
      case EVENT_UPDATE_REQUEST:
        return { loading: true };
      case EVENT_UPDATE_SUCCESS:
        return { loading: false, success: true, event: action.payload };
      case EVENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_UPDATE_RESET:
        return { event: {} };
      default:
        return state;
    }
  };
  
  export const eventDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_DELETE_REQUEST:
        return { loading: true };
      case EVENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EVENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  