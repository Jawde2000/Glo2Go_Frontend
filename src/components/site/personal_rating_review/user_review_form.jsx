import React, { useState } from "react";
import { Typography, Box, TextField, Button, Rating } from "@mui/material";

function UserReviewForm({ onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating > 0 && review.trim() !== "") {
      // Call the onReviewSubmit function with the new rating and review
      onReviewSubmit({ rating, review });
      // Reset the form
      setRating(0);
      setReview("");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Write a Review</Typography>
      <Rating
        name="user-rating"
        value={rating}
        onChange={handleRatingChange}
        size="large"
      />
      <TextField
        label="Your Review"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={review}
        onChange={handleReviewChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

export default UserReviewForm;
