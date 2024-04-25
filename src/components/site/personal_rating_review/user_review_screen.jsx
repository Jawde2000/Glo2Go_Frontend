import React, { useState } from "react";
import { Typography, Box, Divider, Container, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserReviewForm from "./user_review_form";
import UserRatingsAndReviews from "../rating_review/ratingreview";

function UserReviewScreen() {
    const [ratings, setRatings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
  
    const handleReviewSubmit = ({ rating, review }) => {
      // Add the new rating and review to the lists
      setRatings([...ratings, rating]);
      setReviews([...reviews, review]);
      setShowForm(false); // Hide the form after submitting
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">
          User Reviews and Ratings
        </Typography>
        <Divider style={{ margin: "16px 0" }} />
  
        {/* Show the FAB if the form is hidden */}
        {!showForm && (
          <Box display="flex" justifyContent="center">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setShowForm(true)}
            >
              <AddIcon />
            </Fab>
          </Box>
        )}
  
        {/* Show the form if the FAB is clicked */}
        {showForm && (
          <>
            <UserReviewForm onReviewSubmit={handleReviewSubmit} />
            <Divider style={{ margin: "16px 0" }} />
          </>
        )}
  
        <UserRatingsAndReviews ratings={ratings} reviews={reviews} />
      </Container>
    );
  }
  
  export default UserReviewScreen;