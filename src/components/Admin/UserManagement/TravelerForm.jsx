import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Paper, 
    Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    gender: yup.string().required('Gender is required')
});

const TravelerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = async (formData) => {
    setSubmitted(true);
    // ... your submit logic
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, mx: 'auto', width: '100%' }}>
        <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        color="primary"
        variant="h5"
        sx={{
            fontSize: '1rem',
            fontStyle: 'italic',
            fontFamily: 'Cursive',
            color: 'deepPurple',
            textAlign: 'center',
          }}
        >
          Welcome, Admin! You’re all set to create a new traveler profile.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            margin="normal"
            fullWidth
          />
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              {...register('gender')}
              labelId="gender-label"
              error={!!errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error" variant="caption">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>
          <Box textAlign="center" mt={4}>
            <Button type="submit" variant="contained" color="primary" disabled={submitted} size="large">
              Create Traveler
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TravelerForm;
