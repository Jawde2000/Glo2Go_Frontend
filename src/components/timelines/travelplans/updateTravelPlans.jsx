import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Divider, Grid, MenuItem } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from "../../commons/Loader/Loader";
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeline, getTimelineDetails } from '../../../actions/timelinesActions';
import { TIMELINE_UPDATE_RESET } from '../../../constants/timelineConstants';
import countryData from '../../timelines/new_timelines/country.json';
import axios from 'axios';

const UpdateTimeline = () => {
  const { tableId } = useParams();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [loadin, setLoadin] = useState(false);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timelineDetails = useSelector(state => state.timelineDetails);
  const { loading, error, timelines } = timelineDetails;

  const timelineUpdate = useSelector(state => state.timelineUpdate);
  const { success } = timelineUpdate;

  useEffect(() => {
    console.log(countryData);
    const formattedCountryData = countryData.map(country => ({
      name: country.name.common,
      code: country.ccn3,
    })).sort((a, b) => a.name.localeCompare(b.name));
    setCountries(formattedCountryData);
  }, []);

  const handleCountryChange = (e) => {
    const inputCountry = e.target.value;
    if (countries.find(country => country.name === inputCountry)) {
      setCountry(inputCountry);
    } else {
      setCountry('');
    }
  };

  useEffect(() => {
    dispatch(getTimelineDetails(tableId));
  }, [dispatch, tableId]);

  useEffect(() => {
    if (timelines && timelines.TimelineID === tableId) {
      setTitle(timelines.TimelineTitle);
      setCountry(timelines.Country);
      setStartDate(timelines.TimelineStartDate);
      setEndDate(timelines.TimelineEndDate);
      setEmail(timelines.TravelerEmail);
      setRegion(timelines.Region)
    }
  }, [timelines, tableId]);

  useEffect(() => {
    if (success) {
      enqueueSnackbar('Timeline updated successfully!', { variant: 'success' });
      dispatch({ type: TIMELINE_UPDATE_RESET });
      navigate("/glo2glo/travelplans");
    }
  }, [success, dispatch, enqueueSnackbar, navigate]);

  const handleCancel = () => {
    navigate("/glo2glo/travelplans");
  };

  const handleSave = async () => {
    setLoadin(true);
    try {
      dispatch(updateTimeline(tableId, title, country, startDate, endDate, email, region)); // Assuming you need to send the region
    } catch (error) {
      console.error('Error updating timeline:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoadin(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 300 }}>
        {loading && <Loader />}
        {loadin && <Loader />}
        {error && <Typography color="error">{error}</Typography>}
        <Typography
          variant="h5"
          sx={{
            fontSize: '1rem',
            fontStyle: 'italic',
            fontFamily: 'Cursive',
            color: 'deepPurple',
            textAlign: 'center',
          }}
        >
          Update your timeline
        </Typography>
        <TextField
          label="Timeline Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          select
          label="Country"
          fullWidth
          value={country}
          onChange={handleCountryChange}
          margin="normal"
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Region"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          margin="normal"
        />
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
        />
        <Grid container alignItems="center" style={{ margin: '20px 0' }}>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={loading || loadin}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || loadin || new Date(startDate) > new Date(endDate)}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default UpdateTimeline;
