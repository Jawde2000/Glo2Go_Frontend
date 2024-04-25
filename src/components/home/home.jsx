// src/components/HomePage.js
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import BottomNavigationbar from './bottomnavigation';
import AttractionList from './attractionList';

const attractions = [
  { id: 1, name: 'Attraction 1' },
  { id: 2, name: 'Attraction 2' },
  { id: 3, name: 'Attraction 3' },
  // Add more attractions
];

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Glo2Go
      </Typography>
      <AttractionList />
    </Container>
  );
};

export default Home;
