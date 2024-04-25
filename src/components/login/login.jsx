import React, { useState } from "react";
import {
  Container, Typography, Paper, Avatar, TextField, Button,
  Grid, CssBaseline, Card, CardContent, Modal, CardMedia, Box 
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon, Star as StarIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

function LoginScreen() {
  const [openAddTrip, setOpenAddTrip] = useState(false);
  const handleOpenAddTrip = () => setOpenAddTrip(true);
  const handleCloseAddTrip = () => setOpenAddTrip(false);
  const [email, setEmail] = useState('');

  const featuredLocations = [
    { name: "Ancient Temples", description: "Explore historic temples and learn about their history.", image: "temples.jpg" },
    { name: "Safari Adventure", description: "Get close to wildlife with our guided safari tours.", image: "safari.jpg" }
  ];

  const upcomingEvents = [
    { name: "Music Festival", date: "2024-05-30", location: "Beach Resort" },
    { name: "Culinary Week", date: "2024-06-15", location: "City Center" }
  ];

  const userReviews = [
    { username: "User1", rating: 4, comment: "Great app! Easy to use and very user-friendly." },
    { username: "User2", rating: 5, comment: "Love the features and design. Highly recommend!" },
    { username: "User3", rating: 4.5, comment: "Excellent customer support. Quick response to queries." },
  ];

  const locationSuggestions = [
    { name: "Beach Resort", image: "https://imageio.forbes.com/specials-images/imageserve/648f06a6152abcf5ef5e44a9/e125175d2a6f8fed0c71b983c4d1368d/960x0.jpg?format=jpg&width=960" },
    { name: "Mountain Retreat", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428616199.jpg?k=36f070a2af1036f54cc83c8022b17060d7c59c83a1860f2609b2650610ec9bc1&o=&hp=1" },
    { name: "Cityscape View", image: "https://img.freepik.com/premium-photo/aerial-view-chicago-skylines-south-sunset_63253-7235.jpg" },
  ];

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
          {/* Existing form fields */}
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
        </form>
        {/* Featured Locations Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Featured Locations
        </Typography>
        <Grid container spacing={2}>
          {featuredLocations.map((location, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardMedia component="img" height="140" image={location.image} alt={location.name} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
      </Paper>
    </Container>
  );
}

export default LoginScreen;
