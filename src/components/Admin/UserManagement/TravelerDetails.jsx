import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material'; // Import Close icon
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form'; // Assuming form validation with react-hook-form

const fetchTravelerDetails = async (travelerEmail) => {
  // Implement API call to fetch traveler details from backend
};

const TravelerDetails = ({ travelerEmail }) => {
  const [traveler, setTraveler] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const { isLoading, error, data } = useQuery(`traveler-${travelerEmail}`, () => fetchTravelerDetails(travelerEmail));

  useEffect(() => {
    if (data) setTraveler(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching traveler details: {error.message}</p>;

  const onSubmit = async (formData) => {
    // Implement API call to update traveler details on backend
    // Handle success/error scenarios
    setEditOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {traveler.Name || `${traveler.FirstName} ${traveler.LastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {traveler.TravelerEmail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {traveler.Gender}
            </Typography>
            {/* ... other traveler details */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant="contained" onClick={handleEditOpen}>
          Edit Details
        </Button>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Traveler Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the traveler's information below.
            </DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('name', { required: true })}
                label="Name"
                error={errors.name}
                helperText={errors.name ? 'Name is required' : ''}
                margin="normal"
                fullWidth
                defaultValue={traveler?.Name || `${traveler?.FirstName} ${traveler?.LastName}`}
              />
              {/* ... other form fields for editing traveler details */}
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          </DialogContent>
          <IconButton onClick={handleEditClose}>
            <Close />
          </IconButton>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default TravelerDetails;
