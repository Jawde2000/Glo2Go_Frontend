import {
    VIEW_SITE_LIST_REQUEST,
    VIEW_SITE_LIST_SUCCESS,
    VIEW_SITE_LIST_FAILURE,
    VIEW_SITE_LIST_RESET,
    UPDATE_SITE_REQUEST,
    UPDATE_SITE_SUCCESS,
    UPDATE_SITE_FAILURE,
    UPDATE_SITE_RESET,
    DELETE_SITE_REQUEST,
    DELETE_SITE_SUCCESS,
    DELETE_SITE_FAILURE,
    DELETE_SITE_RESET,
    VIEW_SINGLE_SITE_REQUEST,
    VIEW_SINGLE_SITE_SUCCESS,
    VIEW_SINGLE_SITE_FAILURE,
    VIEW_SINGLE_SITE_RESET,
    GET_RANDOM_SITE_REQUEST,
    GET_RANDOM_SITE_SUCCESS,
    GET_RANDOM_SITE_FAILURE,
    GET_RANDOM_SITE_RESET
} from '../constants/siteConstants';

export const siteListReducer = (state = { sites: [] }, action) => {
    switch(action.type) {
        case VIEW_SITE_LIST_REQUEST:
            return { loading: true };

        case VIEW_SITE_LIST_SUCCESS:
            return { loading: false, sites: action.payload };

        case VIEW_SITE_LIST_FAILURE:
            return { loading: false, error: action.payload };

        case VIEW_SITE_LIST_RESET:
            return { sites: [] };

        default:
            return state;
    }
};

export const siteUpdateReducer = (state = { }, action) => {
    switch(action.type) {
        case UPDATE_SITE_REQUEST:
            return { loading: true };

        case UPDATE_SITE_SUCCESS:
            return { loading: false, success: true };

        case UPDATE_SITE_FAILURE:
            return { loading: false, error: action.payload };

        case UPDATE_SITE_RESET:
            return { };

        default:
            return state;
    }
};

export const siteDeleteReducer = (state = { }, action) => {
    switch(action.type) {
        case DELETE_SITE_REQUEST:
            return { loading: true };

        case DELETE_SITE_SUCCESS:
            return { loading: false, success: true };

        case DELETE_SITE_FAILURE:
            return { loading: false, error: action.payload };

        case DELETE_SITE_RESET:
            return { };

        default:
            return state;
    }
};

export const singleSiteReducer = (state = { site: {} }, action) => {
    switch(action.type) {
        case VIEW_SINGLE_SITE_REQUEST:
            return { loading: true };

        case VIEW_SINGLE_SITE_SUCCESS:
            return { loading: false, site: action.payload };

        case VIEW_SINGLE_SITE_FAILURE:
            return { loading: false, error: action.payload };

        case VIEW_SINGLE_SITE_RESET:
            return { site: {} };

        default:
            return state;
    }
};

export const randomSiteReducer = (state = { site: {} }, action) => {
    switch(action.type) {
        case GET_RANDOM_SITE_REQUEST:
            return { loading: true };

        case GET_RANDOM_SITE_SUCCESS:
            return { loading: false, site: action.payload };

        case GET_RANDOM_SITE_FAILURE:
            return { loading: false, error: action.payload };

        case GET_RANDOM_SITE_RESET:
            return { site: {} };

        default:
            return state;
    }
};
