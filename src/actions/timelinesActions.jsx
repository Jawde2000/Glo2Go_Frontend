// timelineActions.js

import axios from 'axios';
import {
    TIMELINE_CREATE_REQUEST,
    TIMELINE_CREATE_SUCCESS,
    TIMELINE_CREATE_FAIL,

    TIMELINE_VIEW_REQUEST,
    TIMELINE_VIEW_SUCCESS,
    TIMELINE_VIEW_FAIL,

    TIMELINE_DELETE_REQUEST, 
    TIMELINE_DELETE_SUCCESS,
    TIMELINE_DELETE_FAIL,

    TIMELINE_UPDATE_REQUEST,
    TIMELINE_UPDATE_SUCCESS,
    TIMELINE_UPDATE_FAIL,

    TIMELINE_GET_REQUEST, 
    TIMELINE_GET_SUCCESS,
    TIMELINE_GET_FAIL,
} from '../constants/timelineConstants';
import Cookies from 'js-cookie';

export const createTimeline = (TimelineTitle, TimelineStartDate, TimelineEndDate, Country, Region) => async (dispatch) => {
    try {
        console.log("Enter Create Timeline");

        dispatch({ type: TIMELINE_CREATE_REQUEST });
        const userInfoFromCookies = Cookies.get('userinfo');
        const decodedString = decodeURIComponent(userInfoFromCookies);
        const jsonObject = JSON.parse(decodedString, null, 10);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const datas =  JSON.parse(jsonObject);

        const { data } = await axios.post('https://localhost:7262/api/Timetable/create-timetable', { 
            TimelineTitle: TimelineTitle, 
            TimelineStartDate: TimelineStartDate, 
            TimelineEndDate: TimelineEndDate, 
            TravelerEmail: datas.TravelerEmail,
            Country: Country,
            Region: Region
        }, config);

        console.log(data);
        if (data.flag) {
            dispatch({ type: TIMELINE_CREATE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({
            type: TIMELINE_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};

export const getTimelineDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TIMELINE_GET_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        console.log(id);

        const { data } = await axios.get('https://localhost:7262/api/Timetable/get-single-timetable?timetableId=' + id, config);
        console.log(data)
        const datas =  JSON.parse(data.message);
        console.log(datas)
        if (data.flag) {
            console.log(datas);
            dispatch({ type: TIMELINE_GET_SUCCESS, payload: datas });
        }
    } catch (error) {
        dispatch({
            type: TIMELINE_GET_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
}

export const updateTimeline = (id, title, country, start, end, travelerEmail, region) => async (dispatch) => {
    try {
        dispatch({ type: TIMELINE_UPDATE_REQUEST });
        console.log(id);
        console.log(country);
        console.log(travelerEmail);
        console.log(region);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put('https://localhost:7262/api/Timetable/update-timetable?timetableId=' + id, {
            timelineTitle : title,
            country: country,
            timelineStartDate: start,
            timelineEndDate: end,
            Region: region
        }, config)

        console.log(data);
        if (data.flag) {
            alert(data.message);
            dispatch({ type: TIMELINE_UPDATE_SUCCESS, payload: data });
            listTimelines(travelerEmail);
        }
    } catch (error) {
        dispatch({
            type: TIMELINE_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
}

export const deleteTimelines = (id) => async (dispatch) => {
    try {
        console.log("Enter Delete Timelines");
        dispatch({ type: TIMELINE_DELETE_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.delete('https://localhost:7262/api/Timetable/delete-timetable?timetableId=' + id, config)

        if (data.flag) {
            dispatch({ type: TIMELINE_DELETE_SUCCESS, payload: data.message });
        }
    } catch (error) {
        dispatch({
            type: TIMELINE_DELETE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
}

export const listTimelines = (travelerEmail) => async (dispatch) => {
    try {
        console.log("Enter List Timelines");
        dispatch({ type: TIMELINE_VIEW_REQUEST });
        console.log(travelerEmail);

        const { data } = await axios.get('https://localhost:7262/api/Timetable/get-timetable', {
            params: { travelerEmail },
        });

        console.log(data);

        // Sort the timelines by TimelineStartDate or another attribute
        const sortedData = data.sort((a, b) => new Date(a.TimelineStartDate) - new Date(b.TimelineStartDate));

        dispatch({ type: TIMELINE_VIEW_SUCCESS, payload: sortedData });
    } catch (error) {
        dispatch({
            type: TIMELINE_VIEW_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};
