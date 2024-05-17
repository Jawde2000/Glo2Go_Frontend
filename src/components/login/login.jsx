import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, Avatar, TextField, Button,
  Grid, CssBaseline, Card, CardContent, Modal, CardMedia, Box, CircularProgress, CardActions, Rating
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon, Star as StarIcon } from "@mui/icons-material";
import { TransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkValidToken, logout } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import Cookies from 'js-cookie';

function LoginScreen() {
  const [openAddTrip, setOpenAddTrip] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomAttraction, setRandomAttraction] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  const tokenValidation = useSelector(state => state.tokenValidation)
  const {isValid} = tokenValidation;
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      console.log(token);
      console.log("token exist, validate token now...")
      dispatch(checkValidToken(token));
    }

  }, [token, isValid])
  

  const upcomingEvents = [
    { name: "Music Festival", date: "2024-05-30", location: "Beach Resort" },
    { name: "Culinary Week", date: "2024-06-15", location: "City Center" }
  ];

  const locationSuggestions = [
    { name: "Beach Resort", image: "https://imageio.forbes.com/specials-images/imageserve/648f06a6152abcf5ef5e44a9/e125175d2a6f8fed0c71b983c4d1368d/960x0.jpg?format=jpg&width=960" },
    { name: "Mountain Retreat", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428616199.jpg?k=36f070a2af1036f54cc83c8022b17060d7c59c83a1860f2609b2650610ec9bc1&o=&hp=1" },
    { name: "Cityscape View", image: "https://img.freepik.com/premium-photo/aerial-view-chicago-skylines-south-sunset_63253-7235.jpg" },
  ];

  const featuredLocations = [
    { name: "Ancient Temples", description: "Explore historic temples and learn about their history.", image: "temples.jpg" },
    { name: "Safari Adventure", description: "Get close to wildlife with our guided safari tours.", image: "safari.jpg" }
  ];

  const locationSuggestion = [
    { name: "Beach Resort", coords: { lat: 36.1, lon: -86.7 } },
    { name: "Mountain Retreat", coords: { lat: 45.0, lon: -110.5 } },
    { name: "Cityscape View", coords: { lat: 41.9, lon: 12.5 } },
  ];

  const getRandomCountry = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const response = await fetch(url);
    const data = await response.json();
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    return randomCountry;
  };

  const getCapitalWeather = async (country) => {
    const capital = country.capital[0]; // Capitals are in an array, taking the first
    const apiKey = '8d9e7d33074f30d15e4fbc345efa073f';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);
    const [locationData] = await response.json();
    return locationData;
};

const fetchWeather = async () => {
  try {
    const apiKey = '8d9e7d33074f30d15e4fbc345efa073f';
    const country = await getRandomCountry();
    const locationData = await getCapitalWeather(country);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=metric`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    setWeather({ ...weatherData, location: country.name.common, capital: country.capital[0] }); // Using common name of the country
    const imageUrl = await fetchImage(country.capital[0]);
    setBackgroundImage(imageUrl);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    // Fetching the site details
      fetch('https://localhost:7262/api/Site/ViewSites')
        .then(response => response.json())
        .then(data => {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomAttraction(data[randomIndex]);
        })
        .catch(error => console.error("Error fetching data:", error));

      // Fetching random reviews
      fetch('https://localhost:7262/api/Review/random/site')
        .then(response => response.json())
        .then(data => {
          setUserReviews(data.map(review => ({
            username: review.travelerEmail.split('@')[0], // Masks the email
            rating: review.reviewRating,
            comment: review.reviewTraveler
          })));
        })
        .catch(error => console.error("Error fetching reviews:", error))
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

  const fetchImage = async (location) => {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=X2qP9e7hrOqy05MiE6DFay0F7BDtWwGrcNYU4CzIV3U`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular;  // Take the first image's regular size URL
  };


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={6} sx={{ my: 4, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Welcome back</Typography>
        <form sx={{ width: '100%', mt: 1 }}>
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleOpenAddTrip}>Add Trip</Button>
          <Modal open={openAddTrip} onClose={handleCloseAddTrip} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">Add a New Trip</Typography>
              <TextField fullWidth label="Destination" margin="normal" />
              <TextField fullWidth label="Date" margin="normal" type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Number of Travelers" margin="normal" type="number" />
              <TextField fullWidth label="Description" margin="normal" multiline rows={4} />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
            </Box>
          </Modal>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {userReviews.map((review, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ height: '200px' }}>
                  <CardContent sx={{ overflow: 'hidden', maxHeight: '300px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>
                        {review.username[0]}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {review.username}
                      </Typography>
                    </Box>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid>
          <Paper elevation={6} sx={{ my: 4, p: 3, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <Box sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}> 
              {weather && ( <> <Typography variant="h5" gutterBottom color="white">Weather Info</Typography> 
              <Typography variant="h6" color="white">Country: {weather.location}</Typography> 
              <Typography variant="body1" color="white">Region: {weather.capital}</Typography> 
              <Typography variant="h4" color="white">Temperature: {weather.main.temp}°C</Typography> 
              <Typography variant="body1" color="white">{weather.weather[0].description}</Typography> 
              </> )} 
            </Box> 
          </Paper>
          </Grid>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Explore Popular Locations</Typography>
          <Grid container spacing={2}>
            {locationSuggestions.map((location, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <img src={location.image} alt={location.name} style={{ width: '100%', borderRadius: 8 }} />
                <Typography variant="caption" display="block" gutterBottom>{location.name}</Typography>
              </Grid>
            ))}
          </Grid>
          {randomAttraction && (
            <Box sx={{ mt: 4, width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Featured Attraction</Typography>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={randomAttraction.sitePics && randomAttraction.sitePics.length > 0 ? randomAttraction.sitePics[0] : '/static/images/placeholder.jpg'}
                        alt={randomAttraction.siteName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">{randomAttraction.siteName}</Typography>
                        <Typography variant="body2" color="text.secondary">{randomAttraction.siteDesc}</Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button size="small" color="primary" component={Link} to="/glo2go/AttractionsList">
                          View More
                      </Button>
                    </CardActions>
                </Card>
            </Box>
        )}
        
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Upcoming Events</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {upcomingEvents.map((event, index) => (
              <Typography key={index} sx={{ mt: 1 }}>{event.name} - {event.date} at {event.location}</Typography>
            ))}
          </Box>
          <Box sx={{ mt: 4, width: '100%', px: { xs: 1, sm: 3, md: 10 } }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Stay Updated with Our Newsletter</Typography>
            <TextField label="Email Address" variant="outlined" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button fullWidth variant="contained" color="primary">Subscribe</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
