import React, { useState, useEffect } from 'react';
import { Paper, Grid, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Typography } from "@mui/material";
import { registerAdmin } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { USER_REGISTER_RESET } from '../../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TravelerForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const userRegister = useSelector(state => state.userRegister);
  const { success, error, message } = userRegister;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setSnackbarMessage("User register Successful");
      setSnackbarOpen(true);
      // Optionally reset form state after successful registration
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsAdmin(false);
      dispatch({ type: USER_REGISTER_RESET });
    } else if (error) {
      setSnackbarMessage("Failed to register user");
      setSnackbarOpen(true);
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [success, error, dispatch]);

  const handleRegister = async () => {
    // Validate all fields are filled
    if (!email || !password || !confirmPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      await dispatch(registerAdmin(email, password, confirmPassword, isAdmin));
    } catch (error) {
      console.error('Error during registration:', error);
      setSnackbarMessage('Network error. Please try again later.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 300 }}>
        <Button onClick={() => navigate(-1)}><ArrowBackIcon /> Back</Button>
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Register User
        </Typography>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          type={'password'} // Toggle password visibility
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          fullWidth
          type={'password'} // Toggle password visibility
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              color="primary"
            />
          }
          label="Is Admin"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          Register User
        </Button>
        <Grid container alignItems="center" style={{ marginTop: '10px' }}>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbarMessage}
      />
    </div>
  );
};

export default TravelerForm;
