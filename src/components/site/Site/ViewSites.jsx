import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, 
  DialogActions, TextField, IconButton, Tooltip, MenuItem, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import countryData from "../../timelines/new_timelines/country.json"

const ViewSites = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newSite, setNewSite] = useState({
    siteName: '',
    siteCountry: '',
    siteAddress: '',
    siteDesc: '',
    siteOperatingHour: ''
  });
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSite(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Check if any required field is empty
    if (!newSite.siteName || !newSite.siteCountry || !newSite.siteAddress || !newSite.siteDesc || !newSite.siteOperatingHour) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('https://localhost:7262/api/Site/AddSite', newSite);
      if (response.data) {
        alert(response.data.message);
        handleClose();
        fetchSites(); // Refresh the list of sites after adding
      }
    } catch (error) {
      console.error('Failed to add site:', error);
      alert('Failed to add site');
    }
  };

  const handleCountryChange = (e) => {
    const inputCountry = e.target.value;
    if (countries.find(country => country.name === inputCountry)) {
      setNewSite({ siteCountry: inputCountry });
    } else {
      setNewSite('');
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const columns = [
    { field: 'siteID', headerName: 'ID', width: 150 },
    { field: 'siteName', headerName: 'Site Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/admin/glo2go/site/${params.id}`)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => confirmDelete(params.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    }
  ];

  const fetchSites = async () => {
    try {
      const response = await fetch('https://localhost:7262/api/Site/ViewSites');
      if (!response.ok) {
        throw new Error('Failed to fetch sites');
      }
      const data = await response.json();
      setSites(data);
    } catch (error) {
      setError('Failed to fetch sites, please try again later.');
    }
    setLoading(false);
  };

  const confirmDelete = (siteID) => {
    if (window.confirm('Are you sure you want to delete this site?')) {
      deleteSite(siteID);
    }
  };

  const deleteSite = async (siteID) => {
    try {
      const response = await axios.delete(`https://localhost:7262/api/Site/DeleteSite`, {
        data: { SiteID: siteID }, // Axios expects `data` for the body in DELETE requests
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data); // Log the response data from axios

      if (response.status === 200) { // Check if the status is OK
        alert(response.data.message);
        fetchSites(); // Refresh the list of sites after deletion
      } else {
        alert('Failed to delete site: ' + response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete site:", error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert('Failed to delete site: ' + error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        alert('No response from server');
      } else {
        console.log('Error', error.message);
        alert('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    // Use the imported country data
    const formattedCountryData = countryData.map(country => ({
      name: country.name.common,
      code: country.cca2,
    })).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    setCountries(formattedCountryData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ margin: '20px 0' }}>
        Sites
      </Typography>
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
        <Tooltip title="Add New Site">
          <IconButton color="primary" onClick={handleOpen}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" textAlign="center" color="error">{error}</Typography>
      ) : (
        <Box sx={{ height: 1000, width: '100%' }}>
          <DataGrid
            rows={sites}
            columns={columns}
            pageSize={5}  // Number of rows per page
            rowsPerPageOptions={[5, 10, 20]}  // Options for rows per page
            checkboxSelection={false}
            disableSelectionOnClick
            getRowId={(row) => row.siteID}
          />
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Site</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Site Name"
            type="text"
            fullWidth
            variant="outlined"
            name="siteName"
            value={newSite.siteName}
            onChange={handleInputChange}
          />
          <TextField
            select
            label="Country"
            fullWidth
            value={newSite.siteCountry}
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
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            name="siteAddress"
            value={newSite.siteAddress}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            name="siteDesc"
            value={newSite.siteDesc}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Operating Hours"
            type="text"
            fullWidth
            variant="outlined"
            name="siteOperatingHour"
            value={newSite.siteOperatingHour}
            onChange={handleInputChange}
            InputProps={{
              placeholder: 'e.g., 6AM - 7PM',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add Site</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ViewSites;
