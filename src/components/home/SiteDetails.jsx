import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card, CardMedia, MenuItem, CardContent, Typography, CircularProgress,
  Box, IconButton, Avatar, Rating, Divider, Button, Modal, TextField, Pagination,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportIcon from '@mui/icons-material/Report';
import Cookies from 'js-cookie';

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
  const { siteId, imageUrl } = useParams();
  const [openAddReview, setOpenAddReview] = useState(false);
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [User, setUser] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();
  const [editReview, setEditReview] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [canPostReview, setCanPostReview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const [reportFeedback, setReportFeedback] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleOpenAddReview = () => setOpenAddReview(true);
  const handleCloseAddReview = () => {
    setOpenAddReview(false);
    setEditReview(false);
    setEditReviewId(null);
    setOverallRating(0);
    setComment('');
  };

  const handleOpenConfirmDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setDeleteReviewId(null);
  };

  const handleReport = async () => {
    if (!reportTitle || !reportFeedback || !reportType) {
      setSnackbar({ open: true, message: 'Please fill in all fields before submitting.' });
      return;
    }

    const reportData = {
      siteID: siteId,
      ReportTitle: reportTitle,
      ReportEmail: User.TravelerEmail,
      ReportFeedback: reportFeedback,
      reportType: reportType,
    };

    try {
      const response = await axios.post('https://localhost:7262/api/Report/create-report', reportData);
      if (response.data.flag) {
        setSnackbar({ open: true, message: response.data.message });
        setOpenReport(false);
      } else {
        setSnackbar({ open: true, message: 'Failed to report site. Please try again later.' });
      }
    } catch (error) {
      console.error('Error reporting site:', error);
      setSnackbar({ open: true, message: 'An error occurred while reporting the site. Please try again later.' });
    }
  };

  const fetchImage = async (location) => {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(location)}&client_id=-sBSX_hBXiEbE8nTDn6_UljGHb6bMMWw_6y10rK9Wl8`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular;
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7262/api/Review/delete-review`, {
        data: { reviewID: deleteReviewId },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.flag) {
        setSnackbar({ open: true, message: response.data.message });
        fetchSite();
        handleCloseConfirmDelete();
      } else {
        setSnackbar({ open: true, message: 'Failed to delete review. Please try again later.' });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setSnackbar({ open: true, message: 'An error occurred while deleting the review. Please try again later.' });
    }
  };

  const handleEdit = (review) => {
    setEditReview(true);
    setEditReviewId(review.reviewID);
    setOverallRating(review.reviewRating);
    setComment(review.reviewTraveler);
    setOpenAddReview(true);
  };

  const fetchSite = useCallback(async () => {
    var parseUser;
    if (User) {
      parseUser = JSON.parse(User);
    }
      
      try {
        const [siteResponse, reviewResponse] = await Promise.all([
          axios.post("https://localhost:7262/api/Site/site/", { SiteID: siteId }),
          axios.post('https://localhost:7262/api/Review/spcfs/review', {
            reviewSite: siteId,
            TravelerComment: parseUser?.TravelerEmail || "",
          })
        ]);
  
        const siteData = siteResponse.data;
        let reviewsData = reviewResponse.data;
  
        if (parseUser?.TravelerEmail) {
          const userReviewIndex = reviewsData.findIndex(review => review.emailID === parseUser.TravelerEmail);
          if (userReviewIndex > -1) {
            const [userReview] = reviewsData.splice(userReviewIndex, 1);
            reviewsData = [userReview, ...reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))];
            setCanPostReview(false);
          } else {
            reviewsData = reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
            setCanPostReview(true);
          }
        } else {
          reviewsData = reviewsData.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
          setCanPostReview(true);
        }
  
        setSite(siteData);
        setReviews(reviewsData);
        setAverageRating(reviewsData.length ? reviewsData.reduce((sum, review) => sum + review.reviewRating, 0) / reviewsData.length : 0);
        setBackgroundImage(await fetchImage(siteData.siteAddress));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching site details:', error);
        setLoading(false);
      }
  }, [siteId, User]);

  useEffect(() => {
    fetchSite();
  }, [fetchSite]);

  useEffect(() => {
    const userInfoFromCookies = Cookies.get('userinfo');
    if (userInfoFromCookies && userInfoFromCookies !== undefined) {
      try {
        const parsedUserInfo = JSON.parse(userInfoFromCookies);
        setUser(parsedUserInfo);
      } catch (error) {
        console.error('Failed to parse user info from cookies:', error);
      }
    }
  }, []);

  const handlePost = async () => {
    if (userInfo !== undefined) {
      if (!comment || overallRating === 0) {
        setSnackbar({ open: true, message: 'Please provide a comment and a rating.' });
        return;
      }

      if (User) {
        const parseUser = JSON.parse(User);
        const reviewData = {
          reviewID: editReview ? editReviewId : 0,
          reviewTraveler: comment,
          travelerEmail: parseUser.TravelerEmail,
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
            setSnackbar({ open: true, message: response.data.message });
            handleCloseAddReview();
            fetchSite();
          } else {
            setSnackbar({ open: true, message: 'Failed to submit review. Please try again later.' });
          }
        } catch (error) {
          console.error('Error submitting review:', error);
          setSnackbar({ open: true, message: 'An error occurred while submitting the review. Please try again later.' });
        }
      }
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
       {userInfo && 
        <Button
            variant="contained"
            color="primary"
            startIcon={<ReportIcon />}
            onClick={() => setOpenReport(true)}
          >
            Report Site
          </Button>
        }
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={backgroundImage}
          alt={site.siteName}
        />
        <CardContent>
          <Typography variant="h5" component="div">{site.siteName}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{site.siteCountry}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{site.siteDesc}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{site.siteAddress}</Typography>
          <Typography variant="body2" color="text.secondary">{`Operating Hours: ${site.siteOperatingHour}`}</Typography>
          <Typography variant="body2" color="text.secondary">{`Entrance Fee: ${site.siteFee}`}</Typography>
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
      <Box>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Reviews
        </Typography>
        {currentReviews.length ? (
          currentReviews.map(review => (
            <Card key={review.reviewID} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2 }} />
                    <Typography variant="body1">{review.travelerEmail}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                  <Rating value={review.reviewRating} readOnly />
                  {
                    (() => {
                      var parsedUser;
                      if (User) {
                        parsedUser = JSON.parse(User);
                      }
                      return review.emailID === parsedUser?.TravelerEmail && (
                        <>
                          <IconButton color="primary" onClick={() => handleEdit(review)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => handleOpenConfirmDelete(review.reviewID)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      );
                    })()
                  }
                </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{review.reviewTraveler}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No reviews available</Typography>
        )}
        {reviews.length > reviewsPerPage && (
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={paginate}
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        )}
        {userInfo && canPostReview && (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpenAddReview}>
              Add Review
            </Button>
          </Box>
        )}
      </Box>

      <Dialog open={openAddReview} onClose={handleCloseAddReview} fullWidth maxWidth="sm">
        <DialogTitle>{editReview ? 'Edit Review' : 'Add Review'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please share your thoughts about the site.
          </DialogContentText>
          <Rating
            value={overallRating}
            onChange={(event, newValue) => setOverallRating(newValue)}
            sx={{ mt: 2 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddReview} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            {editReview ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete} fullWidth maxWidth="sm">
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={openReport} onClose={() => setOpenReport(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', bgcolor: 'background.paper',
          boxShadow: 24, p: 4, width: '90%', maxWidth: 500,
        }}>
          <Typography variant="h6" component="h2">
            Report Site
          </Typography>
          <TextField
            select
            fullWidth
            label="Report Type"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            sx={{ mt: 2 }}
          >
            {reportTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Report Title"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Report Feedback"
            multiline
            rows={4}
            value={reportFeedback}
            onChange={(e) => setReportFeedback(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleReport}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}

export default SiteDetails;
