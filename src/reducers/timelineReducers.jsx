import {
    TIMELINE_CREATE_REQUEST, 
    TIMELINE_CREATE_SUCCESS,
    TIMELINE_CREATE_FAIL,
    TIMELINE_CREATE_RESET,

    TIMELINE_UPDATE_REQUEST, 
    TIMELINE_UPDATE_SUCCESS,
    TIMELINE_UPDATE_FAIL,
    TIMELINE_UPDATE_RESET,

    TIMELINE_DELETE_REQUEST, 
    TIMELINE_DELETE_SUCCESS,
    TIMELINE_DELETE_FAIL,
    TIMELINE_DELETE_RESET,

    TIMELINE_VIEW_REQUEST,
    TIMELINE_VIEW_SUCCESS,
    TIMELINE_VIEW_FAIL,
    TIMELINE_VIEW_RESET 
} from '../constants/timelineConstants'

export const timelineCreateReducer = (state = { }, action) => {
    switch(action.type){
        case TIMELINE_CREATE_REQUEST:
            return {loading: true}
        
        case TIMELINE_CREATE_SUCCESS:
           return {loading: false, success: true, timeline: action.payload}
        
        case TIMELINE_CREATE_FAIL:
           return {loading: false, error: action.payload}
        
        case TIMELINE_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const timelineUpdateReducer = (state = { }, action) => {
    switch(action.type){
        case TIMELINE_UPDATE_REQUEST:
            return {loading: true}
        
        case TIMELINE_UPDATE_SUCCESS:
           return {loading: false, success: true, timeline: action.payload}
        
        case TIMELINE_UPDATE_FAIL:
           return {loading: false, error: action.payload}
        
        case TIMELINE_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const timelineDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case TIMELINE_DELETE_REQUEST:
            return {loading: true}
        
        case TIMELINE_DELETE_SUCCESS:
           return {loading: false, success: true, message: action.payload}
        
        case TIMELINE_DELETE_FAIL:
           return {loading: false, error: action.payload}
        
        case TIMELINE_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const timelineDetailsReducer = (state = { timelines: [] }, action) => {
    switch (action.type) {
        case TIMELINE_VIEW_REQUEST:
            return { loading: true, timelines: [] };
            
        case TIMELINE_VIEW_SUCCESS:
            return { loading: false, timelines: action.payload };

        case TIMELINE_VIEW_FAIL:
            return { loading: false, error: action.payload };

        case TIMELINE_VIEW_RESET:
            return {}

        default:
            return state;
    }
};

export const timelineListReducer = (state = { timelines: [] }, action) => {
    switch (action.type) {
        case TIMELINE_VIEW_REQUEST:
            return { loading: true, timelines: [] };
            
        case TIMELINE_VIEW_SUCCESS:
            return { loading: false, timelines: action.payload };

        case TIMELINE_VIEW_FAIL:
            return { loading: false, error: action.payload };

        case TIMELINE_VIEW_RESET:
            return {}

        default:
            return state;
    }
};
