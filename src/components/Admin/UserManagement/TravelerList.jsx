import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, CircularProgress, Button, Dialog, 
  DialogActions, DialogContent, DialogTitle, TextField,
  MenuItem, Select, FormControl, InputLabel  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const TravelerList = () => {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [currentTraveler, setCurrentTraveler] = useState({
    name: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    travelerEmail: '',
    travelerPass: '',
    gender: '',
    isLocked: false,
    failedLoginAttempt: 0
  });

  useEffect(() => {
    fetchTravelers();
  }, []);

  const handleOpen = async (travelerEmail) => {
    try {
      console.log(travelerEmail)
      const url = `https://localhost:7262/api/Authentication/userinfo`; // Adjust the URL as necessary
      const requestData = {
        travelerEmail: travelerEmail
      };

      const response = await axios.post(url, requestData);
      console.log(response);
      setCurrentTraveler(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch traveler details:', error);
      alert('Failed to fetch traveler details');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTraveler(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTraveler(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (currentTraveler) {
      try {
        const url = `https://localhost:7262/api/Authentication/updateTraveler`; // Adjust the URL as necessary
        const requestData = {
          "name": currentTraveler.name,
          "firstName": currentTraveler.firstName,
          "lastName": currentTraveler.lastName,
          "profilePic": currentTraveler.profilePic,
          "address": {
            "addressId": 0,
            "travelAddress": "string",
            "country": "string",
            "travelerEmail": "string",
            "traveler": {
              "name": "string",
              "firstName": "string",
              "lastName": "string",
              "profilePic": "string",
              "travelerEmail": "string",
              "travelerPass": "string",
              "gender": 0,
              "isLocked": true,
              "failedLoginAttempt": 0
            }
          },
          "travelerEmail": currentTraveler.travelerEmail,
          "travelerPass": currentTraveler.travelerPass,
          "gender": currentTraveler.gender
        };

        const response = await axios.put(url, requestData);
        if (response.data) {
          alert(response.data.message);
          handleClose();
          fetchTravelers(); // Refresh list after updating
        }
      } catch (error) {
        console.error('Failed to update traveler:', error);
        alert('Failed to update traveler');
      }
    }
  };

  const fetchTravelers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7262/api/Authentication/getuser');
      if (response.data) {
        setTravelers(response.data);
      } else {
        throw new Error('No data returned');
      }
    } catch (error) {
      console.error('Failed to fetch travelers:', error);
      setError('Failed to fetch travelers, please try again later.');
    }
    setLoading(false);
  };

  const confirmDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this traveler?')) {
      deleteTraveler(email);
    }
  };

  const deleteTraveler = async (email) => {
    try {
      const response = await axios.delete(`https://localhost:7262/api/Authentication/deleteTraveler`, { data: { TravelerEmail: email } });
      if (response.status === 200) {
        alert(response.data.message);
        fetchTravelers(); // Refresh list after deleting
      } else {
        alert('Failed to delete traveler: ' + response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete traveler:", error);
      alert('Failed to delete traveler');
    }
  };

  const columns = [
    { field: 'travelerEmail', headerName: 'Email', flex: 1 },
    { field: 'isLocked', headerName: 'Is Locked', flex: 1, type: 'boolean' },
    { field: 'failedLoginAttempt', headerName: 'Failed Login Attempts', type: 'number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="outlined" onClick={() => handleOpen(params.row.travelerEmail)}>Edit</Button>
          <Button variant="contained" color="error" onClick={() => confirmDelete(params.row.travelerEmail)}>Delete</Button>
        </Box>
      ),
    }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" sx={{ margin: '20px 0' }}>Traveler List</Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={travelers}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.travelerEmail}
          loading={loading}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Traveler</DialogTitle>
        <DialogContent>
        <TextField margin="dense" name="travelerEmail" label="Email" type="text" fullWidth variant="outlined" value={currentTraveler?.travelerEmail || ''} onChange={handleInputChange} />
          <TextField margin="dense" name="name" label="Name" type="text" fullWidth variant="outlined" value={currentTraveler?.name || ''} onChange={handleInputChange} />
          <TextField margin="dense" name="firstName" label="First Name" type="text" fullWidth variant="outlined" value={currentTraveler?.firstName || ''} onChange={handleInputChange} />
          <TextField margin="dense" name="lastName" label="Last Name" type="text" fullWidth variant="outlined" value={currentTraveler?.lastName || ''} onChange={handleInputChange} />
          <TextField margin="dense" name="profilePic" label="Profile Picture URL" type="text" fullWidth variant="outlined" value={currentTraveler?.profilePic || ''} onChange={handleInputChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={currentTraveler?.gender || ''}
              label="Gender"
              onChange={handleInputChange}
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="dense" name="travelerPass" label="Password" type="password" fullWidth variant="outlined" value={currentTraveler?.travelerPass || ''} onChange={handleInputChange} />
          <TextField margin="dense" name="isLocked" label="Is Locked" type="checkbox" checked={currentTraveler?.isLocked || false} onChange={handleInputChange} />
          <TextField margin="dense" name="failedLoginAttempt" label="Failed Login Attempts" type="number" fullWidth variant="outlined" value={currentTraveler?.failedLoginAttempt || 0} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TravelerList;