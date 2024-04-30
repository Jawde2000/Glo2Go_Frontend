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
  useTheme,
} from '@mui/material';
import { useQuery } from 'react-query';
import { DeleteForever } from '@mui/icons-material'; // Import DeleteForever icon

const fetchTravelers = async () => {
  // Placeholder for the API call to fetch travelers
  return [];
};

const TravelerList = () => {
  const [travelers, setTravelers] = useState([]);
  const theme = useTheme();

  const { isLoading, error, data } = useQuery('travelers', fetchTravelers);

  useEffect(() => {
    if (data) setTravelers(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching travelers: {error.message}</p>;

  const handleDeleteTraveler = async (travelerId) => {
    // Placeholder for API call to delete a traveler
  };

  const colors = { // Assuming similar color setup or import your theme colors if you have them
    primary: theme.palette.primary.main,
    error: theme.palette.error.main,
    background: theme.palette.background.paper,
  };

  return (
    <Paper sx={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: colors.background,
      '& .MuiTableCell-head': {
        backgroundColor: colors.primary,
        color: theme.palette.common.white,
        fontWeight: 'bold',
      },
      '& .MuiButton-contained': {
        margin: theme.spacing(1),
      },
      '& .MuiIconButton-root': {
        color: colors.error,
      },
    }}>
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
                  <DeleteForever />
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
