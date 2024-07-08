import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Divider, Grid, MenuItem } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {Loader} from "../../commons/Loader/Loader.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { createTimeline } from '../../../actions/timelinesActions';
import { TIMELINE_CREATE_RESET } from '../../../constants/timelineConstants';
import countryData from '../../commons/country.json';
import axios from 'axios';

const NewTimelines = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState('');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timelineCreate = useSelector(state => state.timelineCreate);
  const { success, timeline } = timelineCreate;

  const handleCancel = () => {
    navigate("/glo2glo/travelplans");
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar(timeline.message, { variant: 'success' });
      dispatch({ type: TIMELINE_CREATE_RESET });
      navigate("/glo2glo/travelplans");
    }
  }, [navigate, success, dispatch, enqueueSnackbar, timeline]);

  useEffect(() => {
    const formattedCountryData = countryData.map(country => ({
      name: country.name.common,
      code: country.cca2,
    })).sort((a, b) => a.name.localeCompare(b.name));
    setCountries(formattedCountryData);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      dispatch(createTimeline(title, startDate, endDate, country, region));
    } catch (error) {
      console.error('Error creating timeline:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    const inputCountry = e.target.value;
    if (countries.find(country => country.name === inputCountry)) {
      setCountry(inputCountry);
    } else {
      setCountry('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 300 }}>
        {loading && <Loader />}
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
          Create a new timeline for your journey!
        </Typography>
        <TextField
          label="Timeline Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || !title || !startDate || !endDate || !country || !region}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default NewTimelines;
