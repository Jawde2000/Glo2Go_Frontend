import axios from 'axios';
import {
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_GET_REQUEST,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
} from '../constants/eventConstants';

export const createEvent = (event, timetableID) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_CREATE_REQUEST });
    console.log("Enter Create Event function");
    console.log(event.title);
    console.log(event.start);
    console.log(event.event_type);
    console.log(event.region);
    console.log(event.description);
    console.log(timetableID);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const start = new Date(event.start);

    // Convert to ISO string
    const isoStringStart = start.toISOString();

    const end = new Date(event.end);

    // Convert to ISO string
    const isoStringEnd = end.toISOString();

    const eventType = event.event_type.toString();

    const response = await axios.post('https://localhost:7262/api/Activity/create-event', {
        activityTitle: event.title,
        activityStartTime: isoStringStart,
        activityEndTime: isoStringEnd,
        activityType: eventType,
        activityRegion: event.region,
        activityDescription: event.description,
        timelineID: timetableID
    }, config);

    console.log(response);

    if (response.flag) {
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: response.message,
      });
    }

  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchEvents = (timetableID) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_GET_REQUEST });
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const { data } = await axios.get(`https://localhost:7262/api/Activity/get-events/${timetableID}`, config);
    
    console.log(data);

    dispatch({
      type: EVENT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_GET_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateEvent = (event) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_UPDATE_REQUEST });

    const { data } = await axios.put(`https://localhost:7262/api/Activity/update-event/${event.event_id}`, event);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DELETE_REQUEST });

    await axios.delete(`https://localhost:7262/api/Activity/delete-event/${eventId}`);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
      payload: eventId,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
