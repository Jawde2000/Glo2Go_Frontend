import React, { useState } from 'react';
import { Box, Avatar, Typography, Rating, TextField, Button, Card, CardContent } from '@mui/material';

const Review = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');

  const handlePost = () => {
    // Handle the post action
    console.log({
      overallRating,
      comment,
    });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>加1美食中心</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1">Chew's Nation</Typography>
            <Typography variant="body2" color="text.secondary">Posting publicly across Google</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Overall Experience</Typography>
          <Rating
            name="overall-rating"
            value={overallRating}
            onChange={(event, newValue) => setOverallRating(newValue)}
          />
        </Box>
        <TextField
          label="Share details of your own experience at this place"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" component="label">
            Add photos and videos
            <input type="file" hidden multiple />
          </Button>
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={handlePost}>
              Post
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Review;
