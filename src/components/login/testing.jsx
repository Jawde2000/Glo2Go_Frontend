import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, Avatar, TextField, Button,
  Grid, CssBaseline, Card, CardContent, Modal, CardMedia, Box, CircularProgress
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon, Star as StarIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

function LoginScreen() {
  const [openAddTrip, setOpenAddTrip] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomAttraction, setRandomAttraction] = useState(null);

  const upcomingEvents = [
    { name: "Music Festival", date: "2024-05-30", location: "Beach Resort" },
    { name: "Culinary Week", date: "2024-06-15", location: "City Center" }
  ];

  const locationSuggestions = [
    { name: "Beach Resort", image: "https://imageio.forbes.com/specials-images/imageserve/648f06a6152abcf5ef5e44a9/e125175d2a6f8fed0c71b983c4d1368d/960x0.jpg?format=jpg&width=960" },
    { name: "Mountain Retreat", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428616199.jpg?k=36f070a2af1036f54cc83c8022b17060d7c59c83a1860f2609b2650610ec9bc1&o=&hp=1" },
    { name: "Cityscape View", image: "https://img.freepik.com/premium-photo/aerial-view-chicago-skylines-south-sunset_63253-7235.jpg" },
  ];


  const userReviews = [
    { username: "User1", rating: 4, comment: "Great app! Easy to use and very user-friendly." },
    { username: "User2", rating: 5, comment: "Love the features and design. Highly recommend!" },
    { username: "User3", rating: 4.5, comment: "Excellent customer support. Quick response to queries." },
  ];

  const featuredLocations = [
    { name: "Ancient Temples", description: "Explore historic temples and learn about their history.", image: "temples.jpg" },
    { name: "Safari Adventure", description: "Get close to wildlife with our guided safari tours.", image: "safari.jpg" }
  ];

  useEffect(() => {
    fetch('https://localhost:7262/api/Site/ViewSites')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Select a random attraction from the fetched data
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomAttraction(data[randomIndex]);
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenAddTrip = () => setOpenAddTrip(true);
  const handleCloseAddTrip = () => setOpenAddTrip(false);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={6} sx={{ my: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome back
        </Typography>
        <form sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOpenAddTrip}
          >
            Add Trip
          </Button>
          {/* Add Trip Modal Form */}
          <Modal
            open={openAddTrip}
            onClose={handleCloseAddTrip}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a New Trip
              </Typography>
              <TextField fullWidth label="Destination" margin="normal" />
              <TextField fullWidth label="Date" margin="normal" type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Number of Travelers" margin="normal" type="number" />
              <TextField fullWidth label="Description" margin="normal" multiline rows={4} />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Box>
          </Modal>
          {/* User Reviews Section */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {userReviews.map((review, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardContent>
                    <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>{review.username[0]}</Avatar>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {review.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
                      {review.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Location Suggestions */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Explore Popular Locations
          </Typography>
          <Grid container spacing={2}>
            {locationSuggestions.map((location, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <img src={location.image} alt={location.name} style={{ width: '100%', borderRadius: 8 }} />
                <Typography variant="caption" display="block" gutterBottom>
                  {location.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {/* Featured Attraction Section */}
          {randomAttraction && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Featured Attraction
              </Typography>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={randomAttraction.sitePics[0] || '/static/images/placeholder.jpg'}
                  alt={randomAttraction.siteName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {randomAttraction.siteName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {randomAttraction.siteDesc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
          {/* Existing UI elements remain the same */}
          {/* Upcoming Events Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Upcoming Events
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {upcomingEvents.map((event, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                {event.name} - {event.date} at {event.location}
              </Typography>
            ))}
          </Box>

          {/* Newsletter Subscription */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Stay Updated with Our Newsletter
            </Typography>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button fullWidth variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginScreen;
