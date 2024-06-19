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
  EVENT_DELETE_RESET,
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

export const updateEvent = (event, timetableID) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_UPDATE_REQUEST });
    console.log(event)

    const config = {
      headers: {
          'Content-Type': 'application/json',
      },
    };

    const response = await axios.put(`https://localhost:7262/api/Activity/update-event`, {
      ActivityID: event.event_id,
      ActivityTitle: event.title,
      ActivityType: event.event_type,
      ActivityStartTime: event.start,
      ActivityEndTime: event.end,
      ActivityRegion: event.region,
      ActivityDescription: event.description,
    }, config);

    if (response.flag) {
      dispatch({
        type: EVENT_UPDATE_SUCCESS,
        payload: response.message,
      });
    }

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
    console.log("Enter delete event");
    console.log(eventId);

    const response = await axios.delete(`https://localhost:7262/api/Activity/delete-event/${eventId}`);

    if (response.flag) {
      dispatch({
        type: EVENT_DELETE_SUCCESS,
        payload: response.message,
      });

      dispatch({type: EVENT_DELETE_RESET});

      dispatch({type: EVENT_GET_REQUEST});
    }

  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
