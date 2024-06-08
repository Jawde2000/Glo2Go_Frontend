import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Scheduler } from '@aldabil/react-scheduler';
import { Button, Modal, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'weather-icons-react'; // Import weather icons

const Timetable = () => {
  const { timetableID, startDate: startDateParam, endDate: endDateParam, country, region, title } = useParams();
  const [startDate, setStartDate] = useState(new Date(startDateParam));
  const [endDate, setEndDate] = useState(new Date(endDateParam));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    setStartDate(new Date(startDateParam));
    setEndDate(new Date(endDateParam));
  }, [startDateParam, endDateParam]);

  const handleForecastClick = async () => {
    const data = await fetchWeatherData(startDate, endDate, country);
    setWeatherData(data);
    setIsModalOpen(true);
  };

  const fetchWeatherData = async (startDate, endDate, country) => {
    const API_KEY = '8d9e7d33074f30d15e4fbc345efa073f';
    const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
    const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: country + ", " + region,
          units: 'metric',
          appid: API_KEY
        }
      });

      console.log(response);

      // Process the response data to match the desired date range
      const weatherList = response.data.list;
      const filteredWeatherData = weatherList.filter(entry => {
        const entryTimestamp = entry.dt;
        return entryTimestamp >= startDateTimestamp && entryTimestamp <= endDateTimestamp;
      }).map(entry => ({
        date: new Date(entry.dt * 1000).toISOString().split('T')[0],
        time: new Date(entry.dt * 1000).toISOString().split('T')[1].split('.')[0], // Extracting time component
        weather: entry.weather[0].description,
        temperature: `${entry.main.temp}°C`
      }));

      console.log(filteredWeatherData);

      return filteredWeatherData;

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please check the country name and try again.');
      return [];
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(weatherData.length / itemsPerPage) - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedData = weatherData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1>{title}</h1>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}> {/* Navigation back button */}
        <ArrowBackIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleForecastClick}>
        Forecast Weather
      </Button>
      <Scheduler
        view="week"
        week={{
          startDate,
          endDate,
        }}
      />
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Weather Forecast for {country}, {region}
          </Typography>
          <Button onClick={closeModal} sx={{ float: 'right', marginTop: '-40px', marginRight: '-20px' }}>Close</Button>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Weather</TableCell>
                  <TableCell>Temperature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.time}</TableCell>
                    <TableCell>{day.weather}</TableCell>
                    <TableCell>{day.temperature}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
              <ArrowBack />
            </IconButton>
            <Typography>
              Page {currentPage + 1} of {Math.ceil(weatherData.length / itemsPerPage)}
            </Typography>
            <IconButton onClick={handleNextPage} disabled={currentPage === Math.ceil(weatherData.length / itemsPerPage) - 1}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Timetable;
