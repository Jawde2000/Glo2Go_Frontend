import React from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const attractions = [
  {
    name: "Eiffel Tower",
    countryCode: "FR",
    country: "France",
    operatingHours: "9:00 AM - 6:00 PM",
    description: "The iconic symbol of Paris and one of the most visited landmarks in the world...",
  },
  {
    name: "Great Wall of China",
    countryCode: "CN",
    country: "China",
    operatingHours: "8:00 AM - 5:00 PM",
    description: "A UNESCO World Heritage site and one of the most impressive architectural feats...",
  },
  // Add more attractions here
];

const TruncatedDescription = ({ text, maxLength }) => {
  if (text.length <= maxLength) {
    return <>{text}</>;
  } else {
    return <>{text.slice(0, maxLength)}...</>;
  }
};

function AttractionList() {
  return (
    <List>
      {attractions.map((attraction, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          button
          component={Link}
          to={`/attraction/${index}`} // Update this URL as needed
        >
          <ListItemAvatar>
            <Avatar>{attraction.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={attraction.name}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary">
                  {attraction.country}
                </Typography>
                <br />
                <Typography component="span" variant="body2" color="textSecondary">
                  {attraction.operatingHours}
                </Typography>
                <br />
                <Box component="span" display="block" maxWidth="90%">
                  <TruncatedDescription text={attraction.description} maxLength={50} />
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
