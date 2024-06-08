import React, { useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Cookies from 'js-cookie';

// Fake hotel data
const fakeHotels = [
  {
    id: 1,
    name: "The Grand Budapest Hotel",
    location: "Zubrowka, Republic of Zubrowka",
    description: "A luxurious hotel with a rich history and elegant decor.",
    rating: 4.8
  },
  {
    id: 2,
    name: "The Overlook Hotel",
    location: "Sidewinder, Colorado, USA",
    description: "A historic hotel with beautiful mountain views.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Hotel Transylvania",
    location: "Transylvania, Romania",
    description: "A spooky yet welcoming hotel for monsters and humans alike.",
    rating: 4.2
  },
  {
    id: 4,
    name: "The Continental",
    location: "New York City, New York, USA",
    description: "A hotel for assassins with strict rules and luxurious amenities.",
    rating: 4.7
  },
  {
    id: 5,
    name: "The Bellagio",
    location: "Las Vegas, Nevada, USA",
    description: "A stunning hotel and casino known for its fountains and luxury.",
    rating: 4.9
  }
];

const HotelList = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [open, setOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: ''
  });

  const handleBooking = () => {
    try {
      const token = Cookies.get('token');
      // Simulate a booking request
      console.log({
        hotelId: selectedHotel.id,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut
      });
      alert(`Booking successful for ${selectedHotel.name}`);
      setOpen(false);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed!");
    }
  };

  const handleOpenDialog = (hotel) => {
    setSelectedHotel(hotel);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Container>
      <h2>Available Hotels</h2>
      <List>
        {fakeHotels.map(hotel => (
          <ListItem key={hotel.id} button>
            <ListItemText primary={hotel.name} secondary={hotel.location} />
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog(hotel)}>
              Book Now
            </Button>
          </ListItem>
        ))}
      </List>
      
      {selectedHotel && (
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Book {selectedHotel.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Check-in Date"
              type="date"
              value={bookingDetails.checkIn}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Check-out Date"
              type="date"
              value={bookingDetails.checkOut}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleBooking} color="primary">
              Book
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default HotelList;
