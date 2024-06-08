import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Divider, Grid } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from "../../commons/Loader/Loader";
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeline, getTimelineDetails } from '../../../actions/timelinesActions';
import { TIMELINE_UPDATE_RESET } from '../../../constants/timelineConstants';

const UpdateTimeline = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timelineDetails = useSelector(state => state.timelineDetails);
  const { loading: loadingDetails, error, timeline } = timelineDetails;

  const timelineUpdate = useSelector(state => state.timelineUpdate);
  const { success } = timelineUpdate;

  useEffect(() => {
    if (success) {
      enqueueSnackbar('Timeline updated successfully!', { variant: 'success' });
      dispatch({ type: TIMELINE_UPDATE_RESET });
      navigate("/glo2glo/travelplans");
    } else {
      if (!timeline?.TimelineTitle || timeline.id !== id) {
        dispatch(getTimelineDetails(id));
      } else {
        setTitle(timeline.TimelineTitle);
        setCountry(timeline.Country);
        setStartDate(timeline.TimelineStartDate);
        setEndDate(timeline.TimelineEndDate);
      }
    }
  }, [dispatch, navigate, id, timeline, success, enqueueSnackbar]);

  const handleCancel = () => {
    navigate("/glo2glo/travelplans");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      dispatch(updateTimeline({ id, title, country, startDate, endDate }));
    } catch (error) {
      console.error('Error updating timeline:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 300 }}>
        {loadingDetails && <Loader />}
        {loading && <Loader />}
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
          label="Country"
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
            disabled={loading || loadingDetails}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || loadingDetails}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default UpdateTimeline;
