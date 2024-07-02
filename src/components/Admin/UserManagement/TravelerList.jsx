import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, MenuItem, Select, FormControl, 
  InputLabel, Paper, Divider, Grid, Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

const TravelerList = () => {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
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
  const [resetFailedLoginAttempt, setResetFailedLoginAttempt] = useState(false);

  useEffect(() => {
    fetchTravelers();
  }, []);

  const handleOpen = async (travelerEmail) => {
    try {
      const url = `https://localhost:7262/api/Authentication/userinfo`; // Adjust the URL as necessary
      const requestData = {
        travelerEmail: travelerEmail
      };

      const response = await axios.post(url, requestData);
      setCurrentTraveler(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch traveler details:', error);
      alert('Failed to fetch traveler details');
    }
  };

  const handleToAdd = () => {
    navigate(`/admin/glo2go/dashboard/travellist/travelerform`);
  }

  const handleClose = () => {
    setOpen(false);
    setCurrentTraveler({
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
    setResetFailedLoginAttempt(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTraveler(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    if (currentTraveler) {
      try {
        const url = `https://localhost:7262/api/Authentication/updateTraveler`; // Adjust the URL as necessary
        const requestData = {
          firstName: currentTraveler.firstName,
          lastName: currentTraveler.lastName,
          profilePic: currentTraveler.profilePic,
          travelerEmail: currentTraveler.travelerEmail,
          gender: currentTraveler.gender,
          isLocked: currentTraveler.isLocked,
          failedLoginAttempt: resetFailedLoginAttempt ? 0 : currentTraveler.failedLoginAttempt
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search sites"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setSearchText('')}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Tooltip title="Add New User">
          <IconButton color="primary" onClick={handleToAdd}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ height: 700, width: '100%' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Paper elevation={3} style={{ padding: 16, width: 500 }}>
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
              </Typography>
              <TextField 
                margin="dense" name="travelerEmail" label="Email" type="text" fullWidth variant="outlined" value={currentTraveler?.travelerEmail || ''} InputProps={{readOnly: true, disableUnderline: true}} />
              <TextField margin="dense" name="firstName" label="First Name" type="text" fullWidth variant="outlined" value={currentTraveler?.firstName || ''} onChange={handleInputChange} />
              <TextField margin="dense" name="lastName" label="Last Name" type="text" fullWidth variant="outlined" value={currentTraveler?.lastName || ''} onChange={handleInputChange} />
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
              <FormControlLabel
                control={
                  <Checkbox
                    name="isLocked"
                    checked={currentTraveler?.isLocked || false}
                    onChange={handleInputChange}
                  />
                }
                label="Is Locked"
              />
              {currentTraveler?.failedLoginAttempt >= 1 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="resetFailedLoginAttempt"
                      checked={resetFailedLoginAttempt}
                      onChange={(e) => setResetFailedLoginAttempt(e.target.checked)}
                    />
                  }
                  label="Reset Failed Login Attempts to 0"
                />
              )}
              <Grid container alignItems="center" style={{ margin: '20px 0' }}>
                <Grid item xs>
                  <Divider />
                </Grid>
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
              </div>
            </Paper>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TravelerList;
