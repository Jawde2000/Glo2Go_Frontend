import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const TruncatedDescription = ({ text, maxLength }) => {
  if (text.length <= maxLength) {
    return <>{text}</>;
  } else {
    return <>{text.slice(0, maxLength)}...</>;
  }
};

function AttractionList() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch('https://localhost:7262/api/Site/ViewSites');
        if (!response.ok) {
          throw new Error('Failed to fetch sites');
        }
        const data = await response.json();
        setSites(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List>
      {sites.map((site, index) => (
        <ListItem
          key={site.siteID || index}
          alignItems="flex-start"
          button
          component={Link}
          to={`/attraction/${site.siteID}`} // Assuming siteID is unique and used for routing
        >
          <ListItemAvatar>
            <Avatar>{site.siteName[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={site.siteName}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary">
                  {site.siteCountry}
                </Typography>
                <br />
                <Typography component="span" variant="body2" color="textSecondary">
                  {site.siteOperatingHour}
                </Typography>
                <br />
                <Box component="span" display="block" maxWidth="90%">
                  <TruncatedDescription text={site.siteDesc} maxLength={100} />
                </Box>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default AttractionList;
