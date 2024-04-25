import React from "react";
import { Typography, Box } from "@mui/material";

function UserRatingsAndReviews({ ratings, reviews }) {
  if (!ratings || ratings.length === 0) {
    return <Typography variant="body2">No ratings and reviews yet.</Typography>;
  }

  // Calculate average rating
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }
  const averageRating = sum / ratings.length;

  return (
    <Box>
      <Typography variant="h6">Average Rating: {averageRating.toFixed(1)}</Typography>
      <Box>
        {ratings.map((rating, index) => (
          <Typography key={index} variant="body2">
            Rating: {rating} / 5 - {reviews[index]}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default UserRatingsAndReviews;
