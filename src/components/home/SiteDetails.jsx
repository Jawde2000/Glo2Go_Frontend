import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, MenuItem, CardContent, Typography, CircularProgress, Box, IconButton, Avatar, Rating, Divider, Button, Modal, TextField, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportIcon from '@mui/icons-material/Report';

const reportTypes = [
  { value: 'SiteName', label: 'Site Name' },
  { value: 'SiteCountry', label: 'Site Country' },
  { value: 'SiteFee', label: 'Site Fee' },
  { value: 'SiteAddress', label: 'Site Address' },
  { value: 'SiteDesc', label: 'Site Description' },
  { value: 'SiteOperatingHour', label: 'Site Operating Hours' },
  { value: 'Others', label: 'Others' },
];

function SiteDetails() {
  const { siteId } = useParams();
  const [openAddReview, setOpenAddReview] = useState(false);
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [User, setUser] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();
  const [editReview, setEditReview] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [canPostReview, setCanPostReview] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const [reportFeedback, setReportFeedback] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState('');

  // Confirmation dialog state
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

    // Reporting state
  const [openReport, setOpenReport] = useState(false);

  const handleOpenAddReview = () => setOpenAddReview(true);
  const handleCloseAddReview = () => {
    setOpenAddReview(false);
    setEditReview(false);
    setEditReviewId(null);
    setOverallRating(0);
    setComment('');
  };

  const handleOpenConfirmDelete = (reviewId) => {
    console.log(reviewId);
    setDeleteReviewId(reviewId);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setDeleteReviewId(null);
  };

  const handleReport = async () => {
    const reportData = {
      siteID: siteId,
      ReportTitle: reportTitle,
      ReportEmail: User.TravelerEmail,
      ReportFeedback: reportFeedback,
      reportType: reportType,
    };

    console.log(reportData)

    try {
      const response = await axios.post('https://localhost:7262/api/Report/create-report', reportData);
      if (response.data.flag) {
        alert(response.data.message);
        setOpenReport(false);
      }
    } catch (error) {
      console.error('Error reporting site:', error);
    }
  };

  const handleDelete = async () => {
    console.log(deleteReviewId);
    try {
      const response = await axios.delete(`https://localhost:7262/api/Review/delete-review`, {
        data: { reviewID: deleteReviewId }, // Axios expects `data` for the body in DELETE requests
        headers: {
            'Content-Type': 'application/json',
        }
      });

      if (response.data.flag) {
        alert(response.data.message);
        fetchSite();
        handleCloseConfirmDelete();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEdit = (review) => {
    setEditReview(true);
    setEditReviewId(review.reviewID);
    setOverallRating(review.reviewRating);
    setComment(review.reviewTraveler);
    setOpenAddReview(true);
  };

  // Memoize the fetchSite function to prevent unnecessary re-renders
  const fetchSite = useCallback(async () => {
    try {
      const response = await axios.post("https://localhost:7262/api/Site/site/", {
        SiteID: siteId
      });

      let response2;

      if (User !== null) {
        response2 = await axios.post('https://localhost:7262/api/Review/spcfs/review', {
          reviewSite: siteId,
          TravelerComment: User.TravelerEmail,
        });
      } else {
        response2 = await axios.post('https://localhost:7262/api/Review/spcfs/review', {
          reviewSite: siteId,
          TravelerComment: "",
        });
      }

      let reviewsData = response2.data;

      // Sort the reviews with the user's comment on top and the rest by the latest date
      if (User.TravelerEmail) {
        const userReviewIndex = reviewsData.findIndex(review => review.emailID === User.TravelerEmail);
        if (userReviewIndex > -1) {
          const [userReview] = reviewsData.splice(userReviewIndex, 1);
          reviewsData = [userReview, ...reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))];
          setCanPostReview(false); // User has already posted a review
        } else {
          reviewsData = reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
        }
      } else {
        reviewsData = reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
      }

      setReviews(reviewsData);
      setSite(response.data);

      const totalRating = reviewsData.reduce((sum, review) => sum + review.reviewRating, 0);
      const avgRating = reviewsData.length ? totalRating / reviewsData.length : 0;
      setAverageRating(avgRating);

      setLoading(false); // Set loading to false after data fetching and state updates

    } catch (error) {
      console.error('Error fetching site details:', error);
      setLoading(false);
    }
  }, [siteId, User.TravelerEmail]);

  useEffect(() => {
    fetchSite();
  }, [fetchSite, handleDelete, handleEdit]);

  useEffect(() => {
    if (userInfo !== null) {
      const user = JSON.parse(userInfo);
      setUser(user);
      console.log(user);
    }
  }, [userInfo]);

  const handlePost = async () => {

    const reviewData = {
      reviewID: editReview ? editReviewId : 0,
      reviewTraveler: comment,
      travelerEmail: User.TravelerEmail,
      reviewSite: siteId,
      reviewRating: overallRating,
      reviewPics: [],
    };

    const apiEndpoint = editReview ? 'https://localhost:7262/api/Review/update/review' : 'https://localhost:7262/api/Review/review';

    try {
      const response = editReview
        ? await axios.put(apiEndpoint, reviewData)
        : await axios.post(apiEndpoint, reviewData);

      if (response.data.flag) {
        alert(response.data.message);
        fetchSite();
        handleCloseAddReview();
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

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
    <Box sx={{ mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Button variant="contained" color="secondary" onClick={() => setOpenReport(true)} startIcon={<ReportIcon />}>
          Report
        </Button>
      </Box>
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
            <strong>Country:</strong> {site.siteCountry}
          </Typography>
          <Typography variant="body2">
            <strong>Fee:</strong> {site.siteFee}
          </Typography>
          <Typography variant="body2">
            <strong>Operating Hours:</strong> {site.siteOperatingHour}
          </Typography>
        </CardContent>
      </Card>
      <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
          Average Rating
        </Typography>
        <Rating value={averageRating.toFixed(2)} precision={0.1} readOnly />
        <Typography variant="h6" ml={1}>{averageRating.toFixed(2)}</Typography>
        <Typography variant="body2" component="div" sx={{ marginLeft: 2 }}>
          ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Typography variant="h5" component="div">
          Reviews
        </Typography>
        {userInfo && canPostReview && (
          <Button variant="contained" color="primary" onClick={handleOpenAddReview}>
            Add Review
          </Button>
        )}
      </Box>
      <Divider sx={{ marginY: 2 }} />
      {currentReviews.map((review) => (
        <Box key={review.reviewID} sx={{ marginBottom: 2, paddingLeft: 2 }}>
          <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
            <Avatar alt={review.emailID} src="/static/images/avatar/1.jpg" />
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="body1" component="div">
                {review.emailID}
              </Typography>
              <Rating value={review.reviewRating} readOnly />
            </Box>
            {review.emailID === User.TravelerEmail && (
              <Box display="flex" sx={{ marginLeft: 'auto' }}>
                <IconButton onClick={() => handleEdit(review)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenConfirmDelete(review.reviewID)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {review.reviewTraveler}
          </Typography>
          <Divider sx={{ marginY: 1 }} />
        </Box>
      ))}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(reviews.length / reviewsPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary"
        />
      </Box>

      <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={openAddReview} onClose={handleCloseAddReview}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
            {editReview ? 'Edit Review' : 'Add Review'}
          </Typography>
          <Rating
            name="overall-rating"
            value={overallRating}
            onChange={(event, newValue) => setOverallRating(newValue)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="review-comment"
            label="Review"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="contained" color="primary" onClick={handlePost}>
              {editReview ? 'Save Changes' : 'Post Review'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseAddReview}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Dialog open={openReport} onClose={() => setOpenReport(false)}>
      <DialogTitle>Report Site</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Report Misinformation and Help Improve Accuracy with Glo2Go
        </DialogContentText>
        <TextField
          label="Title"
          value={reportTitle}
          onChange={(event) => setReportTitle(event.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          select
          label="Type"
          value={reportType}
          onChange={(event) => setReportType(event.target.value)}
          fullWidth
          SelectProps={{
            native: false,
          }}
          sx={{ mt: 2 }}
        >
          {reportTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          <TextField
            label="Feedback"
            multiline
            rows={6}
            value={reportFeedback}
            onChange={(event) => setReportFeedback(event.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReport(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReport} color="error">
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SiteDetails;
