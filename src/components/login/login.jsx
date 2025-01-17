import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, Avatar, TextField, Button, IconButton,
  Grid, CssBaseline, Card, CardContent, CardMedia, Box, CircularProgress, CardActions, Rating, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { checkValidToken } from '../../actions/userActions';
import { styled } from '@mui/material/styles';
import CardComponent from "../commons/CardComponent";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    boxShadow: '20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff',
    transition: '0.3s',
    '&.Mui-focused': {
      boxShadow: 'inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: '1rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const MAX_DESC_LENGTH = 100; // Maximum characters for site description

function LoginScreen() {
  const [openAddTrip, setOpenAddTrip] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomAttraction, setRandomAttraction] = useState(null);
  const [popularLocation, setPopularLocation] = useState([]);
  const [mightLikeThese, setMightLikeThis] = useState([]);
  const [topX, setTopX] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const tokenValidation = useSelector(state => state.tokenValidation);
  const { isValid } = tokenValidation;
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/glo2go/search/${encodeURIComponent(searchTerm)}`);
    } else {
      // Optionally show an error message or disable search
     setDialogOpen(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(checkValidToken(token));
    }
  }, [token]);

  const truncateDesc = (desc) => {
    if (desc.length > MAX_DESC_LENGTH) {
      return `${desc.substring(0, MAX_DESC_LENGTH)}...`;
    }
    return desc;
  };

  const getRandomCountry = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const response = await fetch(url);
    const data = await response.json();
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    return randomCountry;
  };

  const getCapitalWeather = async (country) => {
    const capital = country.capital[0];
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
      setWeather({ ...weatherData, location: country.name.common, capital: country.capital[0] });
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
    const fetchData = async () => {
      try {
        // Fetch random attraction
        const responseAttraction = await axios.get('https://localhost:7262/api/Site/ViewSites');
        const dataAttraction = responseAttraction.data;
        const randomIndex = Math.floor(Math.random() * dataAttraction.length);
        const attraction = dataAttraction[randomIndex];
        const fullAddress = attraction.siteName + ", " + attraction.siteAddress;
        const imageUrl = await fetchImage(fullAddress);
        setRandomAttraction({ ...attraction, imageUrl });
  
        // Fetch popular sites
        const responsePopular = await axios.get('https://localhost:7262/api/Site/TopPopularSites');
        const dataPopular = responsePopular.data;
        
        // Fetch images for each site and add imageUrl to each site
        const sitesWithImages = await Promise.all(dataPopular.map(async (site) => {
          const fullAddress = `${site.siteName}, ${site.siteAddress}`;
          const imageUrl = await fetchImage(fullAddress);
          return { ...site, imageUrl };
        }));

        console.log(sitesWithImages)
        setPopularLocation(sitesWithImages);

        const responseMight = await axios.get('https://localhost:7262/api/Site/GetRecommendedSites');
        const dataMight = responseMight.data;
        
        // Fetch images for each site and add imageUrl to each site
        const sitesWithImages2 = await Promise.all(dataMight.map(async (site) => {
          const fullAddress = `${site.siteName}, ${site.siteAddress}`;
          const imageUrl = await fetchImage(fullAddress);
          return { ...site, imageUrl };
        }));

        console.log(sitesWithImages2)
        setMightLikeThis(sitesWithImages2);

        const responseX = await axios.get('https://localhost:7262/api/Site/GetRecommendedSites');
        const dataX = responseX.data;
        
        // Fetch images for each site and add imageUrl to each site
        const sitesWithImages3 = await Promise.all(dataX.map(async (site) => {
          const fullAddress = `${site.siteName}, ${site.siteAddress}`;
          const imageUrl = await fetchImage(fullAddress);
          return { ...site, imageUrl };
        }));

        console.log(sitesWithImages3)
        setTopX(sitesWithImages3);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Fetch user reviews
    axios.get('https://localhost:7262/api/Review/random/site')
      .then(response => {
        const data = response.data;
        setUserReviews(data.map(review => ({
          username: review.travelerEmail,
          rating: review.reviewRating,
          comment: review.reviewTraveler,
          site: review.reviewSite
        })));
      })
      .catch(error => console.error("Error fetching reviews:", error))
      .finally(() => setLoading(false));
  
  }, []);  


  const handleOpenAddTrip = () => setOpenAddTrip(true);
  const handleCloseAddTrip = () => setOpenAddTrip(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const fetchImage = async (location) => {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=-sBSX_hBXiEbE8nTDn6_UljGHb6bMMWw_6y10rK9Wl8`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={1} sx={{ my: 4, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form sx={{ width: '100%', mt: 1 }}>
        <Typography component="h1" variant="h3" display={'flex'} alignItems={'center'} alignContent={'center'}>Explore the trip!</Typography>
          <Paper sx={{ my: 4, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="search"
            label="Search destinations, hotels, etc."
            name="search"
            autoComplete="off"
            autoFocus
            onKeyPress={handleKeyPress}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </Paper>
          <CssBaseline />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {userReviews.map((review, index) => (
              <Grid item xs={12} sm={4} key={index} component={Link} to={"/glo2go/AttractionsList/" + review.site} sx={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ overflow: 'hidden', maxHeight: '300px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>
                        {review.username}
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
          <Paper
            elevation={6}
            sx={{
              my: 4,
              p: 3,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // width: 'fit-content',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(65, 65, 65, 0.308)',
                borderRadius: '10px',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.089)',
                width: '220px',
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              {weather && (
                <>
                  <Typography variant="h5" gutterBottom color="white" sx={{ fontWeight: 700, fontSize: '0.9em', letterSpacing: '1.2px' }}>
                    {weather.location}, {weather.capital}
                  </Typography>
                  <Typography variant="body2" color="rgb(197, 197, 197)" sx={{ fontWeight: 500, fontSize: '0.7em', letterSpacing: '1.2px' }}>
                    {weather.weather[0].description.toUpperCase()}
                  </Typography>
                  <Box component="svg" width="50px" height="50px">
                    <image
                      width="50"
                      height="50"
                      x="0"
                      y="0"
                      href="data:image/png;base64,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"
                    />
                  </Box>
                  <Typography variant="h3" color="white" sx={{ fontWeight: 900, fontSize: '1.5em' }}>
                    {Math.round(weather.main.temp)}°C
                  </Typography>
                </>
              )}
            </Box>
          </Paper>          
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Explore Popular Locations</Typography>
          <Grid container spacing={2}>
          {popularLocation.map((location, index) => (
            <Grid item xs={12} sm={4} key={index} component={Link} to={`/glo2go/AttractionsList/${location.siteID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img
                  src={location?.imageUrl}
                  alt={location?.siteName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
              <Typography variant="caption" display="block" gutterBottom>{location?.siteName}</Typography>
            </Grid>
          ))}
          </Grid>
          {randomAttraction && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={randomAttraction.imageUrl && randomAttraction.imageUrl.length > 0 ? randomAttraction.imageUrl : '/static/images/placeholder.jpg'}
                  alt={randomAttraction.siteName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">{randomAttraction.siteName}</Typography>
                  <Typography variant="body2" color="text.secondary">{truncateDesc(randomAttraction.siteDesc)}</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button size="small" color="primary" component={Link} to="/glo2go/AttractionsList">
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Box>
          )}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>You Might Like These - More Things to Do in the World</Typography>
          <Grid container spacing={2}>
            {mightLikeThese.map((activity, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={activity?.imageUrl}
                    alt={activity?.siteName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{activity?.siteName}</Typography>
                    <Typography variant="body2" color="text.secondary">{truncateDesc(activity?.siteDesc)}</Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button size="small" color="primary" component={Link} to={`/glo2go/AttractionsList/${activity?.siteID}`}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Top Experiences on Glo2Go</Typography>
          <Grid container spacing={2}>
            {topX.map((experience, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={experience?.imageUrl}
                    alt={experience?.siteName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{experience?.siteName}</Typography>
                    <Typography variant="body2" color="text.secondary">{truncateDesc(experience?.siteDesc)}</Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button size="small" color="primary" component={Link} to={`/glo2go/AttractionsList/${experience?.siteID}`}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </form>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          Please enter a search term.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default LoginScreen;