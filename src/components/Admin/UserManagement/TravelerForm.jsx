import React, { useState } from 'react';
import { TextField, Button, Link, Paper, Divider, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { IsValidEmail } from "../../../components/functions/IsValidEmail";
import { Loader } from "../../commons/Loader/Loader";
import { Google as GoogleIcon } from '@mui/icons-material';
import { registerAdmin } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { USER_REGISTER_RESET } from '../../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TravelerForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin checkbox
  const [loading, setLoading] = useState(false); // Loading state
  const userRegister = useSelector(state => state.userRegister);
  const navigate = useNavigate();
  const { success, userInfo } = userRegister;
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async () => {
    setLoading(true); // Start loading
    console.log("Enter Register");

    try {
      dispatch(registerAdmin(email, password, confirmPassword, isAdmin));
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
      dispatch({type: USER_REGISTER_RESET})
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 16, width: 300 }}>
      <Button onClick={() => navigate(-1)}><ArrowBackIcon /> Back</Button>
        {loading && <Loader />}
        <Typography
          variant="h5"
          sx={{
            fontSize: '1rem',         // Sets the font size to 1rem
            fontStyle: 'italic',      // Makes the font style italic
            fontFamily: 'Cursive',    // Sets the font family to a cursive style
            color: 'deepPurple',      // Sets the font color to deep purple
            textAlign: 'center',      // Centers the text horizontally
          }}
        >
          Register An User
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          fullWidth
          type="password"
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
        <Grid container alignItems="center" style={{ margin: '20px 0' }}>
        </Grid>
      </Paper>
    </div>
  );
};

export default TravelerForm;
