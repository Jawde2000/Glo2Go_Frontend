import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import countryData from "../../timelines/new_timelines/country.json"
// List of some example countries
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: "MY", name: 'Malaysia'},
  { code: "SG", name: 'Singapore'},
];

const CreateSiteForm = () => {
  const [site, setSite] = useState({
    siteName: '',
    siteAddress: '',
    siteRating: 0, // Assuming rating is collected elsewhere
    sitePics: [],
    siteDesc: '',
    siteOperatingHour: '',
  });
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  const handleCountryChange = (e) => {
    const inputCountry = e.target.value;
    if (countries.find(country => country.name === inputCountry)) {
      setCountry(inputCountry);
    } else {
      setCountry('');
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSite((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://localhost:7262/api/Site/AddSite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(site),
      });

      if (response.ok) {
        alert('Site created successfully!');
        setSite({
          siteName: '',
          siteAddress: '',
          siteDesc: '',
          siteOperatingHour: '',
        });
        setCountry('');
        navigate('/admin/glo2go/viewsite'); // Adjust this route as needed
      } else {
        alert('Failed to create site. Please try again.');
      }
    } catch (error) {
      console.error('Error creating site:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 20, maxWidth: 600 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Create New Site
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <TextField
            label="Site Name"
            fullWidth
            value={site.siteName}
            onChange={handleInputChange}
            name="siteName"
            margin="normal"
            required // Mark as required field
            error={!site.siteName} // Set error state for empty field
            helperText={!site.siteName ? 'Please enter a name for your site.' : ''} // Display error message
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
            label="Address"
            fullWidth
            value={site.siteAddress}
            onChange={handleInputChange}
            name="siteAddress"
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={site.siteDesc}
            onChange={handleInputChange}
            name="siteDesc"
            margin="normal"
          />
          <TextField
            label="Operating Hours"
            fullWidth
            value={site.siteOperatingHour}
            onChange={handleInputChange}
            name="siteOperatingHour"
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 16 }} onClick={handleSubmit}>
            Create Site
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CreateSiteForm;
