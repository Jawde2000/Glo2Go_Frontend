import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Container } from '@mui/material';

const ViewSites = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('https://localhost:7262/api/Site/ViewSites');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSites(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch sites:", error);
      setLoading(false);
    }
  };

  const deleteSite = async (siteID) => {
    try {
      const response = await fetch(`https://localhost:7262/api/Site/DeleteSite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SiteID: siteID }),
      });

      if (response.ok) {
        alert(response.data.message);
      }

      // Refresh the list of sites
      fetchSites();
    } catch (error) {
      console.error("Failed to delete site:", error);
    }
  };

  if (loading) {
    return <Typography variant="h5" textAlign="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ margin: '20px 0' }}>
        View Sites
      </Typography>
      <List>
        {sites.map((site) => (
          <ListItem key={site.siteID}>
            <ListItemText
              primary={site.siteName}
              secondary={`Address: ${site.siteAddress}, Description: ${site.siteDesc}, Operating Hours: ${site.siteOperatingHour}`}
            />
            <ListItemSecondaryAction>
              <Button variant="contained" color="secondary" onClick={() => deleteSite(site.siteID)}>
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ViewSites;
