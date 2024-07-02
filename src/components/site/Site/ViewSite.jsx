import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button, Grid, Divider, MenuItem } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import countryData from '../../timelines/new_timelines/country.json';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewSite = () => {
  const { siteId } = useParams();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [site, setSite] = useState({
    SiteName: '',
    SiteCountry: '',
    SiteAddress: '',
    SiteDesc: '',
    SiteOperatingHour: ''
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch site details
  useEffect(() => {
    const fetchSite = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`https://localhost:7262/api/Site/site`, {
          siteID: siteId
        });
        setSite(response.data);
        console.log(response);
        setCountry(response.data.siteCountry);
      } catch (error) {
        console.error('Error fetching site details:', error);
        setError('Failed to fetch site details');
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, [siteId]);

  // Handle edit mode toggle
  const handleEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    console.log(countryData);
    const formattedCountryData = countryData.map(country => ({
      name: country.name.common,
      code: country.ccn3,
    })).sort((a, b) => a.name.localeCompare(b.name));
    setCountries(formattedCountryData);
  }, []);

  // Save edited site details
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`https://localhost:7262/api/Site/UpdateSite`, site);
      enqueueSnackbar('Site details updated successfully!', { variant: 'success' });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating site details:', error);
      enqueueSnackbar('Failed to update site details. Please try again later.', { variant: 'error' });
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

  // Cancel editing
  const handleCancel = () => {
    setEditMode(false);
  };

  // Render loading spinner while fetching data
  if (loading) return <CircularProgress />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 550 }}>
      <Button onClick={() => navigate(-1)}><ArrowBackIcon /> Back</Button>
        <Typography variant="h5" sx={{ fontSize: '1rem', fontStyle: 'italic', fontFamily: 'Cursive', color: 'deepPurple', textAlign: 'center' }}>
          View Site Details
        </Typography>
        <Divider />
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Site Name"
              value={site.siteName}
              InputProps={{ readOnly: !editMode }}
              onChange={(e) => setSite({ ...site, SiteName: e.target.value })}
              margin="normal"
            />
            <TextField
                select
                label="Country"
                fullWidth
                value={country}
                InputProps={{ readOnly: !editMode }}
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
              fullWidth
              multiline
              rows={editMode? 10:2}
              label="Description"
              value={site.siteDesc}
              InputProps={{ readOnly: !editMode }}
              onChange={(e) => setSite({ ...site, SiteDesc: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              value={site.siteAddress}
              InputProps={{ readOnly: !editMode }}
              onChange={(e) => setSite({ ...site, SiteAddress: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Operating Hours"
              value={site.siteOperatingHour}
              InputProps={{ readOnly: !editMode }}
              onChange={(e) => setSite({ ...site, SiteOperatingHour: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
            {editMode ? (
              <>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
                  Save
                </Button>
                <Button onClick={handleCancel} color="secondary" style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} color="primary">
                Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ViewSite;
