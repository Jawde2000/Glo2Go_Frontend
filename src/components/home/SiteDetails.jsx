import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

function SiteDetails() {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const response = await axios.post("https://localhost:7262/api/Site/site/", {
            SiteID: siteId
        });
        setSite(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching site details:', error);
        setLoading(false);
      }
    };

    fetchSite();
  }, [siteId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!site) {
    return <Typography variant="h6" textAlign="center">Site not found</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>  {/* Adds margin bottom to the whole component */}
      <Card raised elevation={6}>
        <CardMedia
          component="img"
          height="400"
          image={site.sitePics?.[0] || '/static/images/placeholder.jpg'}
          alt={site.siteName || 'Attraction Image'}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {site.siteName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {site.siteDesc}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Address:</strong> {site.siteAddress}
          </Typography>
          <Typography variant="body2">
            <strong>Operating Hours:</strong> {site.siteOperatingHour}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SiteDetails;
