import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, CardActions, Typography,
  Button, Container, Grid, CircularProgress, Alert, TablePagination, IconButton, TextField, MenuItem, Box, Modal, Slider, Chip, InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import countryData from '../commons/country.json';

function AttractionsList() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);  // Customize based on your layout
  const [searchTerm, setSearchTerm] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [feeRange, setFeeRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [operatingHourFilter, setOperatingHourFilter] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: '',
    addressFilter: '',
    feeRange: [0, 100],
    ratingFilter: 0,
    operatingHourFilter: '',
    country: ''
  });

  const navigate = useNavigate();

  const truncate = (text, length = 100) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  useEffect(() => {
    // Use the imported country data
    const formattedCountryData = countryData.map(country => ({
      name: country.name.common,
      code: country.cca2,
    })).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    setCountries(formattedCountryData);
  }, []);

  useEffect(() => {
    fetch('https://localhost:7262/api/Site/ViewSites')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSites(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sites:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset page to 0 when changing the number of items per page
  };

  const handleFeeRangeChange = (event, newValue) => {
    setFeeRange(newValue);
  };

  const handleCountryChange = (e) => {
    const inputCountry = e.target.value;
    setCountry(inputCountry);
  };

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      searchTerm,
      addressFilter,
      feeRange,
      ratingFilter,
      operatingHourFilter,
      country
    });
    handleCloseFilterModal();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setAddressFilter('');
    setFeeRange([0, 100]);
    setRatingFilter(0);
    setOperatingHourFilter('');
    setCountry('');
    setAppliedFilters({
      searchTerm: '',
      addressFilter: '',
      feeRange: [0, 100],
      ratingFilter: 0,
      operatingHourFilter: '',
      country: ''
    });
  };

  const filteredSites = sites.filter(site => {
    const fee = parseInt(site.siteFee.replace('$', ''), 10);
    return (
      site.siteName.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase()) &&
      site.siteCountry.toLowerCase().includes(appliedFilters.country.toLowerCase()) &&
      site.siteAddress.toLowerCase().includes(appliedFilters.addressFilter.toLowerCase()) &&
      (fee >= appliedFilters.feeRange[0] && fee <= appliedFilters.feeRange[1]) &&
      site.siteRating >= appliedFilters.ratingFilter &&
      site.siteOperatingHour.toLowerCase().includes(appliedFilters.operatingHourFilter.toLowerCase())
    );
  });

  const filterSites = (searchValue) => {
    const filtered = sites.filter(site =>
      site.siteName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSites(filtered.slice(0, rowsPerPage)); // Assuming rowsPerPage is defined in your component
  };
  

  const currentData = filteredSites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg">
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, marginBottom: 2 }}>
        Sites
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            filterSites(e.target.value); // Add this line to filter sites immediately
          }}
          sx={{ marginRight: 2 }}
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="outlined" color="primary" onClick={handleOpenFilterModal}>
            Open Filters
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        {Object.entries(appliedFilters).map(([key, value]) => (
          value && (
            <Chip
              key={key}
              label={`${key}: ${Array.isArray(value) ? `${value[0]} - ${value[1]}` : value}`}
              sx={{ marginRight: 1 }}
            />
          )
        ))}
      </Box>
      <Grid container spacing={4}>
        {currentData.map((site) => (
          <Grid item key={site.siteID} xs={12} sm={6} md={4}>
            <Card raised elevation={6} sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={site.sitePics?.[0] || '/static/images/placeholder.jpg'}
                alt={site.siteName || 'Attraction Image'}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {site.siteName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncate(site.siteDesc, 40)}
                </Typography>
                <Typography variant="body2">
                  <strong>Operating Hours:</strong> {site.siteOperatingHour}
                </Typography>
                <Typography variant="body2">
                  <strong>Country:</strong> #{site.siteCountry.replace(/\s+/g, '').toLowerCase()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" color="primary" component={Link} to={`/glo2go/AttractionsList/${site.siteID}`}>
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        component="div"
        count={filteredSites.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={filterModalOpen}
        onClose={handleCloseFilterModal}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 
        }}>
          <Typography id="filter-modal-title" variant="h6" component="h2">
            Filters
          </Typography>
          <TextField
            select
            label="Region"
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
          <Typography gutterBottom>
            Fee Range
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <TextField
              label="Min Fee"
              variant="outlined"
              type="number"
              value={feeRange[0]}
              onChange={(e) => setFeeRange([parseInt(e.target.value, 10), feeRange[1]])}
              sx={{ marginRight: 2 }}
            />
            <TextField
              label="Max Fee"
              variant="outlined"
              type="number"
              value={feeRange[1]}
              onChange={(e) => setFeeRange([feeRange[0], parseInt(e.target.value, 10)])}
            />
          </Box>
          <TextField
            label="Filter by Address"
            variant="outlined"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Filter by Rating"
            variant="outlined"
            type="number"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseInt(e.target.value, 10))}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Filter by Operating Hour"
            variant="outlined"
            value={operatingHourFilter}
            onChange={(e) => setOperatingHourFilter(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Button onClick={handleApplyFilters} color="primary" variant="contained" sx={{ mt: 2 }}>
            Apply Filters
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default AttractionsList;
