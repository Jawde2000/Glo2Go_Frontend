import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  DialogActions,
  Grid,
  Divider,
  MenuItem,
} from "@mui/material";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

const CustomEditor = ({ scheduler }) => {
  const event = scheduler.edited;

  // State for form fields and validation
  const [state, setState] = useState({
    title: event?.title || "",
    start: event?.start || "",
    end: event?.end || "",
    eventType: event?.eventType || "",
    region: event?.region || "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Your own validation
    if (state.title.length < 3) {
      return setError("Title must be at least 3 characters long");
    }

    try {
      scheduler.loading(true);

      // Simulate remote data saving
      const added_updated_event = await new Promise((res) => {
        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            title: state.title,
            start: state.start,
            end: state.end,
            eventType: state.eventType,
            region: state.region,
          });
        }, 3000);
      });

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={state.title}
              onChange={(e) => handleChange(e.target.value, "title")}
              error={!!error}
              helperText={error}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date/Time"
              type="datetime-local"
              value={state.start}
              onChange={(e) => handleChange(e.target.value, "start")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date/Time"
              type="datetime-local"
              value={state.end}
              onChange={(e) => handleChange(e.target.value, "end")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Event Type"
              value={state.eventType}
              onChange={(e) => handleChange(e.target.value, "eventType")}
              fullWidth
              variant="outlined"
            >
              {eventTypes.map((option) => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <CustomRegionField
              label="Region"
              value={state.region}
              onChange={(value) => handleChange(value, "region")}
            />
          </Grid>
        </Grid>
      </div>
      <Divider />
      <DialogActions>
        <Button
          onClick={scheduler.close}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </div>
  );
};

// Dummy implementation of CustomRegionField for demonstration
const CustomRegionField = ({ label, value, onChange }) => {
  const searchBoxRef = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      onChange(places[0].formatted_address);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCIQigHVKYc2ApZ2aTgQlomiSmC4_No-nY"
      libraries={libraries}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

// Dummy data for event types
const eventTypes = [
  { id: 1, type: "Business Trip" },
  { id: 2, type: "Leisure Travel" },
  { id: 3, type: "Adventure/Sport" },
  { id: 4, type: "Cultural Exploration" },
  { id: 5, type: "Sightseeing" },
  { id: 6, type: "Hiking/Trekking" },
  { id: 7, type: "Beach Vacation" },
  { id: 8, type: "Shopping Trip" },
  { id: 9, type: "Food and Culinary Experience" },
  { id: 10, type: "Wellness and Spa Retreat" },
  { id: 11, type: "Educational Travel/Activities" },
  { id: 12, type: "Volunteer/Community Service Trip" },
  { id: 13, type: "Family Vacation" },
  { id: 14, type: "Romantic Getaway" },
  { id: 15, type: "Wildlife and Nature Exploration" },
];

export default CustomEditor;
