import React, { useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TravelPlan = ({ title, plans }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
      <Typography variant="h6">{title}</Typography>
      <List>
        {plans.map((plan, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => handleToggle(index)}
              style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '8px' }}
            >
              <ListItemText
                primary={plan.date}
                secondary={expandedIndex === index ? plan.activity : ''}
                style={{ fontSize: expandedIndex === index ? '1rem' : '1.2rem' }}
              />
              <IconButton size="small">
                {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItem>
            {index !== plans.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TravelPlan;
