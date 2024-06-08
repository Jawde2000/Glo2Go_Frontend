import React from 'react'
import { Box, Grid, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'

function AccountSettings() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            placeholder="Tim"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            placeholder="Cook"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            placeholder="(408) 996–1010"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="emailAddress"
            label="Email Address"
            variant="outlined"
            placeholder="tcook@apple.com"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="city">City</InputLabel>
            <Select
              id="city"
              label="City"
              defaultValue=""
              variant="outlined"
            >
              <MenuItem value="california">California</MenuItem>
              <MenuItem value="washington">Washington</MenuItem>
              <MenuItem value="toronto">Toronto</MenuItem>
              <MenuItem value="newyork">New York</MenuItem>
              <MenuItem value="london">London</MenuItem>
              <MenuItem value="netherland">Netherlands</MenuItem>
              <MenuItem value="poland">Poland</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select
              id="country"
              label="Country"
              defaultValue=""
              variant="outlined"
            >
              <MenuItem value="america">America</MenuItem>
              <MenuItem value="england">England</MenuItem>
              <MenuItem value="poland">Poland</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountSettings
