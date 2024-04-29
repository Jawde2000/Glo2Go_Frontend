import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { useQuery } from 'react-query';
import { DeleteForever } from '@mui/icons-material'; // Import DeleteForever icon

const fetchTravelers = async () => {
  // Implement API call to fetch travelers from backend
};

const TravelerList = () => {
  const [travelers, setTravelers] = useState([]);

  const { isLoading, error, data } = useQuery('travelers', fetchTravelers);

  useEffect(() => {
    if (data) setTravelers(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching travelers: {error.message}</p>;

  const handleDeleteTraveler = async (travelerId) => {
    // Implement API call to delete traveler on backend
    // Handle success/error scenarios
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {travelers.map((traveler) => (
            <TableRow key={traveler.TravelerEmail}>
              <TableCell>{traveler.Name || `${traveler.FirstName} ${traveler.LastName}`}</TableCell>
              <TableCell>{traveler.TravelerEmail}</TableCell>
              <TableCell>{traveler.Gender}</TableCell>
              <TableCell align="right">
                <Button variant="contained" href={`/travelers/${traveler.TravelerEmail}`}>
                  Edit
                </Button>
                <IconButton onClick={() => handleDeleteTraveler(traveler.TravelerEmail)}>
                  <DeleteForever color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TravelerList;
