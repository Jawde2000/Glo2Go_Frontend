import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // You need to import the expand icon
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // You need to import the expand icon
import TravelPlan from './travelplans';
import { useNavigate } from 'react-router-dom';

const plans = [
  { date: '21 Sep', activity: 'Arrival in Tokyo' },
  { date: '22 Sep', activity: 'Explore Shibuya and Harajuku' },
  { date: '23 Sep', activity: 'Visit Kyoto temples' },
  { date: '24 Sep', activity: 'Day trip to Nara' },
  { date: '25 Sep', activity: 'Hike Mount Fuji' },
  { date: '26 Sep', activity: 'Relax in an onsen' },
  { date: '27 Sep', activity: 'Departure from Osaka' },
];

function TravelPlanDisplay() {
    const [isContainerExpanded, setIsContainerExpanded] = useState(true);
    const navigate = useNavigate();
    
    const handleAddPlan = () => {
      // Implement the logic for adding a new plan here
      navigate("/newtimeline");
    };
  
    const toggleContainerSize = () => {
      setIsContainerExpanded(!isContainerExpanded);
    };
  
    return (
      <Container
        maxWidth="md"
        style={{
          marginTop: '20px',
          maxHeight: isContainerExpanded ? 'none' : '200px', // Adjust the height as needed
          overflow: 'hidden',
          transition: 'max-height 0.5s ease-in-out',
        }}
        onClick={toggleContainerSize}
      >
        <CssBaseline />
        <Typography variant="h4" align="center" gutterBottom>
          Travel Itinerary
        </Typography>
        <TravelPlan title="21 Sep - 27 Sep | Japan" plans={plans} />
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
          }}
          onClick={handleAddPlan}
        >
          <AddIcon />
        </Fab>
      </Container>
    );
  }
  
  export default TravelPlanDisplay;