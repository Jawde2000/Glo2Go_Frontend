import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Avatar, Box, FormControl, InputLabel, Select, MenuItem, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';  // Ensure you import the custom theme

function Profile() {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        bio: 'Bio here...',
        birthday: '1980-01-01',
        country: 'USA',
        phoneNumber: '123-456-7890',
        website: 'https://example.com',
        profilePic: 'https://bootdey.com/img/Content/avatar/avatar7.png'
    });

    const handleChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Account Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Profile</Typography>
                        <Avatar src={profile.profilePic} sx={{ width: 80, height: 80 }} />
                        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                            Change Photo
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            value={profile.firstName}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            value={profile.lastName}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={profile.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                label="Gender"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={profile.bio}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Birthday"
                            name="birthday"
                            type="date"
                            defaultValue="1980-01-01"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            variant="outlined"
                            value={profile.country}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            value={profile.phoneNumber}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Website"
                            name="website"
                            variant="outlined"
                            value={profile.website}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Box textAlign="right" sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default Profile;
