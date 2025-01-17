import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Icon,
  Input,
} from '@mui/material'

function CompanySettings() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FormLabel htmlFor="companyId">Company ID</FormLabel>
            <OutlinedInput
              id="companyId"
              startAdornment={
                <InputAdornment position="start">
                  <Icon>
                    <svg width="1em" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Icon>
                </InputAdornment>
              }
              placeholder="apple"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FormLabel htmlFor="companyName">Name</FormLabel>
            <TextField
              id="companyName"
              variant="outlined"
              placeholder="Apple"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FormLabel htmlFor="emailCompany">Email Address</FormLabel>
            <TextField
              id="emailCompany"
              type="email"
              variant="outlined"
              placeholder="info@apple.com"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FormLabel htmlFor="companySize">Size</FormLabel>
            <OutlinedInput
              id="companySize"
              type="number"
              placeholder="6000"
              startAdornment={
                <InputAdornment position="start">
                  <Icon>group</Icon>
                </InputAdornment>
              }
              inputProps={{ min: 0 }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CompanySettings
