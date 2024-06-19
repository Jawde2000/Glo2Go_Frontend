import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Scheduler } from '@aldabil/react-scheduler';
import {
  Button, Modal, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, 
  Grid, TextField, DialogActions, MenuItem, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent, deleteEvent, fetchEvents } from '../../../actions/eventActions';
import Cookies from 'js-cookie';
import { EVENT_CREATE_RESET, EVENT_DELETE_RESET } from '../../../constants/eventConstants';
import {APILoader, PlacePicker} from '@googlemaps/extended-component-library/react';

const eventTypes = [
  { id: 1, type: 'Business Trip' },
  { id: 2, type: 'Leisure Travel' },
  { id: 3, type: 'Adventure/Sport' },
  { id: 4, type: 'Cultural Exploration' },
  { id: 5, type: 'Sightseeing' },
  { id: 6, type: 'Hiking/Trekking' },
  { id: 7, type: 'Beach Vacation' },
  { id: 8, type: 'Shopping Trip' },
  { id: 9, type: 'Food and Culinary Experience' },
  { id: 10, type: 'Wellness and Spa Retreat' },
  { id: 11, type: 'Educational Travel/Activities' },
  { id: 12, type: 'Volunteer/Community Service Trip' },
  { id: 13, type: 'Family Vacation' },
  { id: 14, type: 'Romantic Getaway' },
  { id: 15, type: 'Wildlife and Nature Exploration' },
];

const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


// GooglePlacesTextField component for region auto-complete
const GooglePlacesTextField = ({ label, value, onChange }) => {
  const textFieldRef = useRef(null);

  useEffect(() => {
    const handleScriptLoad = () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not available.");
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(textFieldRef.current, {
        types: ['(regions)'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
        }
      });
    };

    if (window.google && window.google.maps) {
      handleScriptLoad();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdbmFHVm1rLhycizZCHZxquaMwcT2phXM&libraries=places`;
      script.async = true;
      script.onload = handleScriptLoad;
      document.head.appendChild(script);
    }
  }, [onChange]);

  return (
    <TextField
      inputRef={textFieldRef}
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

const CustomEditor = ({ scheduler, onCreateEvent, onUpdateEvent, onDeleteEvent }) => {
  const event = scheduler.edited;
  const start = event ? formatDateForInput(event.start) : formatDateForInput(scheduler.state.start.value);
  const end = event ? formatDateForInput(event.end) : formatDateForInput(scheduler.state.end.value);
  console.log(start, end);

  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || "",
    region: event?.region || "",
    start: start,
    end: end,
    eventType: event?.event_type || ""
  });

  console.log(state.start, state.end);


  const [error, setError] = useState("");

  const handleChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.title.length < 3) {
      return setError("Min 3 letters");
    }

    try {
      scheduler.loading(true);

      const added_updated_event = {
        event_id: event?.event_id,
        title: state.title,
        start: new Date(state.start),
        end: new Date(state.end),
        description: state.description,
        region: state.region,
        event_type: state.eventType
      };

      if (event) {
        await onUpdateEvent(added_updated_event);
        scheduler.onConfirm(added_updated_event, "edit");
      } else {
        await onCreateEvent(added_updated_event);
        scheduler.onConfirm(added_updated_event, "create");
      }

      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  return (
    <Dialog open={true} onClose={scheduler.close} fullWidth maxWidth="sm">
      <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Title"
                value={state.title}
                onChange={(e) => handleChange(e.target.value, "title")}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Description"
                value={state.description}
                onChange={(e) => handleChange(e.target.value, "description")}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <GooglePlacesTextField
                label="Region"
                value={state.region}
                onChange={(value) => handleChange(value, "region")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Start Time"
                type="datetime-local"
                value={state.start}
                onChange={(e) => handleChange(e.target.value, "start")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="End Time"
                type="datetime-local"
                value={state.end}
                onChange={(e) => handleChange(e.target.value, "end")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                variant="outlined"
                margin="normal"
                fullWidth
                label="Event Type"
                value={state.eventType}
                onChange={(e) => handleChange(e.target.value, "eventType")}
              >
                {eventTypes.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit} type="submit">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

const Timetable = () => {
  const { timetableID, startDate: startDateParam, endDate: endDateParam, country, region: regionParam, title } = useParams();
  const [startDate, setStartDate] = useState(new Date(startDateParam));
  const [endDate, setEndDate] = useState(new Date(startDateParam));
  const [startDateDisplay, setStartDateDisplay] = useState();
  const [endDateDisplay, setEndDateDisplay] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchedEvent, setFetchedEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(startDateParam));
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(regionParam || '');
  const itemsPerPage = 5;
  const eventGet = useSelector(state => state.eventGet);
  const eventCreate = useSelector(state => state.eventCreate);
  const eventDelete = useSelector(state => state.eventDelete);
  const { loading, events } = eventGet;
  const { success: createSuccess, event: message } = eventCreate;
  const { success: deleteSuccess, event: messageDelete } = eventCreate;
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  const getPreviousSaturday = (date) => {
    const day = date.getDay();
    const prevSaturday = new Date(date);
    prevSaturday.setDate(date.getDate() - ((day + 1) % 7));
    return prevSaturday;
  };

  useEffect(() => {
    dispatch(fetchEvents(timetableID));
    setFetchedEvent(events);
    dispatch({ type: EVENT_DELETE_RESET });  // Reset the delete success state
    console.log(events);
  }, [token, timetableID, deleteSuccess]);

  useEffect(() => {
    if (createSuccess) {
      alert(message);
      setIsModalOpen(false); // Close the event creation form modal
      dispatch({type: EVENT_CREATE_RESET});
    }
  }, [createSuccess, message, dispatch]);

  const handleCreateEvent = async (event) => {
    console.log("Enter create event");
    try {
      // Dispatch action to handle created event
      dispatch(createEvent(event, timetableID));
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      dispatch(updateEvent(event));
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    console.log(id);
    try {
      dispatch(deleteEvent(id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    const initialStartDate = getPreviousSaturday(new Date(startDateParam));
    setStartDate(initialStartDate);
    const initialEndDate = new Date(initialStartDate);
    initialEndDate.setDate(initialStartDate.getDate() + 6);
    setEndDate(initialEndDate);
  }, [startDateParam]);

  useEffect(() => {
    const options = { month: 'short', day: 'numeric' };
    setStartDateDisplay(new Date(startDate).toLocaleDateString('default', options));
    setEndDateDisplay(new Date(endDate).toLocaleDateString('default', options));
  }, [startDate, endDate]);

  const handleForecastClick = async () => {
    const data = await fetchWeatherData(startDate, endDate, country, region);
    setWeatherData(data);
    setIsModalOpen(true);
  };

  const fetchWeatherData = async (startDate, endDate, country, region) => {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
    const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
    const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: `${country},${region}`,
          units: 'metric',
          appid: API_KEY
        }
      });

      const weatherList = response.data.list;
      const filteredWeatherData = weatherList.filter(entry => {
        const entryTimestamp = entry.dt;
        return entryTimestamp >= startDateTimestamp && entryTimestamp <= endDateTimestamp;
      }).map(entry => ({
        date: new Date(entry.dt * 1000).toISOString().split('T')[0],
        time: new Date(entry.dt * 1000).toISOString().split('T')[1].split('.')[0],
        weather: entry.weather[0].description,
        temperature: `${entry.main.temp}°C`
      }));

      return filteredWeatherData;

    } catch (error) {
      setError('Failed to fetch weather data. Please check the country name and try again.');
      return [];
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(weatherData.length / itemsPerPage) - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedData = weatherData.slice(startIndex, startIndex + itemsPerPage);

  const navigateBack = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 6);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedDate(newStartDate);
  };

  const navigateForward = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 6);

    if (newStartDate <= new Date(endDateParam)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setSelectedDate(newStartDate);
    }
  };

  const minDate = new Date(startDateParam);
  const maxDate = new Date(endDateParam);
  const showBackButton = startDate > minDate;
  const showForwardButton = endDate < maxDate;

  useEffect(() => {
    const newDate = new Date(startDate);
    setSelectedDate(newDate);
  }, [startDate]);

  const formatDateRange = (start, end) => {
    const options = { month: 'short', day: 'numeric' };
    const startFormatted = new Date(start).toLocaleDateString('default', options);
    const endFormatted = new Date(end).toLocaleDateString('default', options);
    return `${startFormatted} - ${endFormatted}`;
  };

  const handleEventDrop = (event) => {
    console.log('Event dropped:', event);
  };

  const formatEvents = (events) => {
    return events.map(event => {
      console.log(event.activityStartTime, event.activityEndTime);
      const startTime = new Date(event.activityStartTime);
      const endTime = new Date(event.activityEndTime);
      console.log(startTime, endTime);

      const start = new Date(new Date().setFullYear(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()));
      start.setHours(startTime.getHours());
      start.setMinutes(startTime.getMinutes());

      const end = new Date(new Date().setFullYear(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()));
      end.setHours(endTime.getHours());
      end.setMinutes(endTime.getMinutes());

      console.log(start, end);

      return {
        event_id: event.activityID,
        title: event.activityTitle,
        start: start,
        end: end,
        description: event.activityDescription,
        event_type: event.activityType.toString(),
        region: event.activityRegion
      };
    });
  };

  const currentWeekRange = formatDateRange(startDateDisplay, endDateDisplay);

  return (
    <div>
      <h1>{title}</h1>
      <IconButton onClick={() => window.history.back()} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleForecastClick}>
        Forecast Weather
      </Button>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {showBackButton && (
            <IconButton onClick={navigateBack}>
              <ArrowBack />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" sx={{ mx: 2 }}>
            {currentWeekRange}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {showForwardButton && (
            <IconButton onClick={navigateForward}>
              <ArrowForward />
            </IconButton>
          )}
        </Box>
      </Grid>
      <Scheduler
        key={selectedDate}
        view="week"
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          startHour: 6,
          endHour: 30
        }}
        customEditor={
          (scheduler) => <CustomEditor 
          scheduler={scheduler} 
          onCreateEvent={handleCreateEvent}
          onUpdateEvent={handleUpdateEvent}
        />}
        onDelete={handleDeleteEvent}
        selectedDate={selectedDate}
        events={formatEvents(events)}
        editable={true}
        deletable={true}
        draggable={true}
        minDate={new Date(startDateParam)}
        maxDate={new Date(endDateParam)}
        navigation={false}
      />
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Weather Forecast for {country}, {region}
          </Typography>
          <Button onClick={closeModal} sx={{ float: 'right', marginTop: '-40px', marginRight: '-20px' }}>Close</Button>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Weather</TableCell>
                  <TableCell>Temperature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.time}</TableCell>
                    <TableCell>{day.weather}</TableCell>
                    <TableCell>{day.temperature}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
              <ArrowBack />
            </IconButton>
            <Typography>
              Page {currentPage + 1} of {Math.ceil(weatherData.length / itemsPerPage)}
            </Typography>
            <IconButton onClick={handleNextPage} disabled={currentPage === Math.ceil(weatherData.length / itemsPerPage) - 1}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Timetable;
