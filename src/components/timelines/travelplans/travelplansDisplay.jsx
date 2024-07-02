import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CssBaseline, Typography, Fab, Tabs, Tab, Box, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { TIMELINE_DELETE_RESET } from '../../../constants/timelineConstants';
import { listTimelines, deleteTimelines } from '../../../actions/timelinesActions';
import Cookies from 'js-cookie';
import Timetable from './Timetable'; // Import the Timetable component
import { Link } from "react-router-dom";

const TravelPlanDisplay = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState({});
  const timelineList = useSelector(state => state.timelineList);
  const timelineDelete = useSelector(state => state.timelineDelete);
  const { loading, error, timelines } = timelineList;
  const { loadingD, errorD, success, message} = timelineDelete;

  const userInfoFromCookies = Cookies.get('userinfo');
  const decodedString = decodeURIComponent(userInfoFromCookies);
  const jsonObject = JSON.parse(decodedString, null, 10);
  const datas =  JSON.parse(jsonObject);

  const fetchImage = async (location) => {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=X2qP9e7hrOqy05MiE6DFay0F7BDtWwGrcNYU4CzIV3U`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0]?.urls.regular;  // Take the first image's regular size URL, handle cases with no results
  };

  useEffect(() => {
    if(success) {
      alert(message);
      dispatch({ type: TIMELINE_DELETE_RESET});
      dispatch(listTimelines(datas.TravelerEmail));
    }
  }, [success])

  useEffect(() => {
    if (timelines && timelines.length > 0) {
      const fetchImages = async () => {
        const urls = await Promise.all(timelines.map(trip => fetchImage(trip.timelineTitle)));
        const urlObject = timelines.reduce((acc, trip, index) => {
          acc[trip.timelineID] = urls[index];
          return acc;
        }, {});
        setImageUrls(urlObject);
      };
      fetchImages();
    }
  }, [timelines]);

  useEffect(() => {
    if (datas.TravelerEmail) {
      dispatch(listTimelines(datas.TravelerEmail));
    }
  }, [dispatch]);

  const handleAddPlan = () => {
    navigate("/glo2go/travelplans/newtimeline");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = (event, timelineID) => {
    event.preventDefault();
    event.stopPropagation(); // Stop propagation of the click event
    console.log(`Edit timeline with ID: ${timelineID}`);
    navigate(`/glo2go/travelplans/edit/${timelineID}`);
  };
  
  const handleDelete = (event, timelineID) => {
    event.preventDefault();
    event.stopPropagation(); // Stop propagation of the click event
    console.log(`Delete timeline with ID: ${timelineID}`);
    dispatch(deleteTimelines(timelineID));
  };  

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {/* Your existing code */}
      <Box mt={3}>
        {tabValue === 0 && (
          <Box>
            {loading ? (
              <Typography variant="body1" align="center">Loading...</Typography>
            ) : error ? (
              <Typography variant="body1" align="center">Error: {error}</Typography>
            ) : (
              timelines.map((trip) => (
                <Card key={trip.timelineID} style={{ marginBottom: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }} component={Link} 
                to={`/glo2go/travelplans/timetable/${trip.timelineID}/${trip.timelineStartDate}/${trip.timelineEndDate}/${trip.country}/${trip.region}/${trip.timelineTitle}`}
                sx={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component="img"
                    alt={trip.timelineTitle}
                    height="200"
                    image={imageUrls[trip.timelineID] || 'https://via.placeholder.com/150'}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">{trip.timelineTitle}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {trip.timelineStartDate} to {trip.timelineEndDate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(event) => handleEdit(event, trip.timelineID)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={(event) => handleDelete(event, trip.timelineID)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </Card>
              ))
            )}
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <Typography variant="body1" align="center">No saved trips</Typography>
          </Box>
        )}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
        }}
        onClick={handleAddPlan}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default TravelPlanDisplay;
