import React from 'react';
import { Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Rating } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const RatingReview = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default', 
        color: 'text.primary', 
        p: 2, 
        maxWidth: 400, 
        margin: 'auto', 
        mt: 4,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar alt="Chew's Nation" src="path_to_avatar_image" />
        <Box ml={2}>
          <Typography variant="h6">Chew's Nation</Typography>
          <Typography variant="body2" color="textSecondary">
            Edit history is visible to developers unless you delete the review.{' '}
            <a href="https://support.google.com" target="_blank" rel="noopener noreferrer">Learn more</a>
          </Typography>
        </Box>
      </Box>
      
      <Typography variant="body1">Rate this Site</Typography>
      <Rating
        name="app-rating"
        defaultValue={1}
        precision={1}
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Always have the problem to login"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      
      <Typography variant="body2">Tell us more (optional)</Typography>
      
      <Typography variant="body2" sx={{ mt: 2 }}>Can you upload videos with this app?</Typography>
      <RadioGroup row>
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="not-sure" control={<Radio />} label="Not sure" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
    </Box>
  );
};

export default RatingReview;
