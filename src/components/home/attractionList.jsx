import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, CardActions, Typography,
  Button, Container, Grid, CircularProgress, Alert, TablePagination, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function AttractionsList() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);  // Customize based on your layout
  const navigate = useNavigate();
  
  const truncate = (text, length = 100) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

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

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  // Calculate the current slice of data to display
  const currentData = sites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}> {/* Navigation back button */}
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, marginBottom: 2 }}>
        Sites
      </Typography>
      <Grid container spacing={4}>
        {currentData.map((site) => (
          <Grid item key={site.siteID} xs={12} sm={6} md={4}>
            <Card raised elevation={6}>
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
                  {truncate(site.siteDesc, 40)} {/* Truncate to 50 characters */}
                </Typography>

                <Typography variant="body2">
                  <strong>Operating Hours:</strong> {site.siteOperatingHour}
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
        count={sites.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default AttractionsList;
