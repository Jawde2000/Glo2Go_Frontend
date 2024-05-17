// src/components/ProfileForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7262/api/Authentication/updateTraveler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally, include other headers like Authorization if needed
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.status);
      }

      const result = await response.json();
      alert(result.message);  // Alert the message from the server
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="fname"
        autoFocus
        value={profile.firstName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        value={profile.lastName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={profile.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="address"
        label="Address"
        type="text"
        id="address"
        autoComplete="street-address"
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="country"
        label="Country"
        type="text"
        id="country"
        autoComplete="country"
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Profile
      </Button>
    </Box>
  );
}
