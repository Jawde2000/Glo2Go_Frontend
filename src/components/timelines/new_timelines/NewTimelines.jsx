import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function NewTimelines() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    // Implement the logic for adding a new plan here
    navigate("/travelplans");
  };

  const newTimeline = () => {
    // Implement logic for new timeline
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">New Timeline</Typography>
      </div>
      <Paper elevation={3} style={{ padding: 16 }}>
        <TextField
          label="Timeline Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Country"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={newTimeline}>
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default NewTimelines;
