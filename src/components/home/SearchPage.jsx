import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const SearchPage = () => {
  const { searchItem } = useParams();
  const [searchResults, setSearchResults] = useState({ reviews: [], sites: [] });
  const navigate = useNavigate();
  
  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`https://localhost:7262/api/Search/search?term=${searchItem}`);

      if (response.status === 200) {
        console.log(response);
        const data = response.data;
        setSearchResults(data);
        console.log(searchResults);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults({ reviews: [], sites: [] });
    }
  };

  useEffect(() => {
    if (searchItem && searchItem.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults({ reviews: [], sites: [] });
    }
  }, [searchItem]);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}> {/* Navigation back button */}
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Search Result for "{searchItem}"
      </Typography>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {searchResults.reviews.map((review, index) => (
            <Link to={`/glo2go/AttractionsList/${review.reviewSite}`} style={{ textDecoration: 'none' }}>
            <Card key={`review-${index}`} style={{ marginBottom: 10 }}>
              <CardContent>
                <Typography variant="body1" component="p">
                  Review Traveler: {review.reviewTraveler}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Review Site: {review.reviewSite}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time Review: {format(new Date(review.dateTime), 'dd MMM yyyy HH:mm:ss')}
                </Typography>
              </CardContent>
            </Card>
          </Link>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Divider style={{ marginBottom: 10 }} />
          <Typography variant="h5" gutterBottom>
            Sites
          </Typography>
          {searchResults.sites.map((site, index) => (
            <Card key={`${site.siteID}`} style={{ marginBottom: 10 }}>
              <CardContent>
                <Link to={`/glo2go/AttractionsList/${site.siteID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body1" component="p">
                    Site Name: {site.siteName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Site Country: {site.siteCountry}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Site Fee: {site.siteFee}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Site Address: {site.siteAddress}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Site Description: {site.siteDesc}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
