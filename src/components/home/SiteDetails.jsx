import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box, IconButton, 
  Avatar, Rating, Divider, Button, Modal, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function SiteDetails() {
  const { siteId } = useParams();
  const [openAddReview, setOpenAddReview] = useState(false);
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [User, setUser] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();
  const handleOpenAddReview = () => setOpenAddReview(true);
  const handleCloseAddReview = () => setOpenAddReview(false);
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin;

  const fetchSite = async () => {
    try {
      const response = await axios.post("https://localhost:7262/api/Site/site/", {
        SiteID: siteId
      });

      const response2 = await axios.post('https://localhost:7262/api/Review/spcfs/review', {
        reviewSite: siteId,
        TravelerComment: User.TravelerEmail,
      });
      setSite(response.data);
      setReviews(response2.data);
      setLoading(false);

      const totalRating = response2.data.reduce((sum, review) => sum + review.reviewRating, 0);
      const avgRating = response2.data.length ? totalRating / response2.data.length : 0;
      setAverageRating(avgRating);
    } catch (error) {
      console.error('Error fetching site details:', error);
      setLoading(false);
    }
  };

  const handlePost = async () => {
    // Handle the post action
    try {
      const response = await axios.post('https://localhost:7262/api/Review/review', {
        reviewTraveler: comment, // Assuming this is the correct property for traveler email
        travelerEmail: User.email, // Assuming this is the correct property for traveler email
        reviewSite: siteId,
        reviewRating: overallRating,
        reviewPics: [], // Add functionality to handle review pictures if needed
      });

      if (response.data.flag) {
        alert(response.data.message);
        fetchSite();
      }
      // Optionally, you can handle success response here (e.g., show a success message)

      // Close the modal after successful review submission
      handleCloseAddReview();
      
      // Fetch site details again to update reviews
      fetchSite();
    } catch (error) {
      console.error('Error posting review:', error);
      // Optionally, you can handle error response here (e.g., show an error message)
    }
  };

  useEffect(() => {
    console.log(userInfo.TravelerEmail)
    const user = JSON.parse(userInfo);
    setUser(user);

    fetchSite();
  }, [siteId, fetchSite]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!site) {
    return <Typography variant="h6" textAlign="center">Site not found</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>  {/* Adds margin bottom to the whole component */}
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}> {/* Navigation back button */}
        <ArrowBackIcon />
      </IconButton>
      <Card raised elevation={6}>
        <CardMedia
          component="img"
          height="400"
          image={site.sitePics?.[0] || '/static/images/placeholder.jpg'}
          alt={site.siteName || 'Attraction Image'}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {site.siteName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {site.siteDesc}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Address:</strong> {site.siteAddress}
          </Typography>
          <Typography variant="body2">
            <strong>Operating Hours:</strong> {site.siteOperatingHour}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Ratings and Reviews</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Rating value={averageRating.toFixed(2)} precision={0.1} readOnly />
          <Typography variant="h6" ml={1}>{averageRating.toFixed(2)}</Typography>
          <Typography variant="body2" color="textSecondary" ml={1}>({reviews.length})</Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenAddReview}>
          Write a Review
        </Button>
        <Modal open={openAddReview} onClose={handleCloseAddReview} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>{site.siteName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1">{User.TravelerEmail}</Typography>
                <Typography variant="body2" color="text.secondary">Posting publicly across Glo2Go</Typography>
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
                <Button variant="outlined" color="secondary" onClick={handleCloseAddReview}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </Modal>
        {reviews === null ? (
          <Typography variant="body1">No reviews yet.</Typography>
        ) : (
          reviews.map((review, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar alt={review.userName} src={review.userAvatar || '/static/images/avatar_placeholder.jpg'} />
                <Box ml={2}>
                  <Typography variant="subtitle1">{review.travelerEmail}</Typography>
                  <Rating value={review.reviewRating} readOnly size="small" />
                  <Typography variant="body2" color="textSecondary">{new Date(review.date).toLocaleDateString()}</Typography>
                </Box>
              </Box>
              <Typography variant="body1">{review.reviewTraveler}</Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary" mr={1}>{review.helpfulCount} people found this helpful</Typography>
                <Button size="small">Yes</Button>
                <Button size="small">No</Button>
              </Box>
              {index < reviews.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default SiteDetails;
