import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Paper, Container, Button, Grid, CardMedia, Modal, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import WorldFlag from "react-world-flags";
import UserRatingsAndReviews from "../rating_review/ratingreview";

// ... attraction data
const attractions = [
  {
    attractionId: "1",
    name: "Eiffel Tower",
    country: "France",
    operatingHours: "9:00 AM - 6:00 PM",
    description: "The iconic symbol of Paris and one of the most visited landmarks in the world...",
  },
  {
    attractionId: "2",
    name: "Great Wall of China",
    country: "China",
    operatingHours: "8:00 AM - 5:00 PM",
    description: "A UNESCO World Heritage site and one of the most impressive architectural feats...",
  },
  // Add more attractions here
];

const fetchImage = async (query) => {
  const accessKey = 'X2qP9e7hrOqy05MiE6DFay0F7BDtWwGrcNYU4CzIV3U'; // Replace with your Unsplash access key
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular; // Get the URL of the first image
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

function AttractionDetail() {
  const { attractionId } = useParams();
  const attraction = attractions.find((attr) => attr.attractionId === attractionId);
  const [imageUrl, setImageUrl] = useState('');
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [reportDetails, setReportDetails] = useState({ wrongName: false, wrongHours: false, wrongCountry: false, additionalInfo: '' });

  useEffect(() => {
    if (attraction) {
      fetchImage(attraction.name).then(url => {
        if (url) setImageUrl(url);
      });
    }
  }, [attraction]);

  const handleReportChange = (event) => {
    setReportDetails({ ...reportDetails, [event.target.name]: event.target.checked });
  };

  const handleAdditionalInfoChange = (event) => {
    setReportDetails({ ...reportDetails, additionalInfo: event.target.value });
  };

  const handleReportSubmit = () => {
    // Implement the report submission logic here
    console.log('Report Submitted:', reportDetails);
    setReportModalOpen(false);
  };

  const ReportModal = () => (
    <Modal open={isReportModalOpen} onClose={() => setReportModalOpen(false)}>
      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
        <Typography variant="h6">Report Incorrect Information</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={reportDetails.wrongName} onChange={handleReportChange} name="wrongName" />} label="Wrong Name" />
          <FormControlLabel control={<Checkbox checked={reportDetails.wrongHours} onChange={handleReportChange} name="wrongHours" />} label="Wrong Operating Hours" />
          <FormControlLabel control={<Checkbox checked={reportDetails.wrongCountry} onChange={handleReportChange} name="wrongCountry" />} label="Wrong Country" />
          <TextField label="Additional Information" multiline rows={4} value={reportDetails.additionalInfo} onChange={handleAdditionalInfoChange} />
        </FormGroup>
        <Button variant="contained" color="primary" onClick={handleReportSubmit} style={{ marginTop: '10px' }}>Submit Report</Button>
      </Box>
    </Modal>
  );

  if (!attraction) {
    return <Container><Typography variant="h5">Attraction not found</Typography></Container>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {attraction.name}
            </Typography>
            <WorldFlag code={attraction.countryCode} height="30" />
            <Typography variant="subtitle1" color="textSecondary">
              {attraction.country}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Operating Hours: {attraction.operatingHours}
            </Typography>
              <Button variant="outlined" color="secondary" onClick={() => setReportModalOpen(true)} style={{ marginTop: '10px' }}>
                Report Incorrect Information
              </Button>
            <ReportModal />
            <Typography variant="body1" style={{ marginTop: '16px', marginBottom: '16px' }}>
              {attraction.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {imageUrl && (
              <CardMedia
                component="img"
                height="250"
                image={imageUrl}
                alt={attraction.name}
                style={{ borderRadius: '8px' }}
              />
            )}
          </Grid>
        </Grid>
        <Divider style={{ margin: "20px 0" }} />
        <UserRatingsAndReviews />
      </Paper>
    </Container>
  );
}

export default AttractionDetail;