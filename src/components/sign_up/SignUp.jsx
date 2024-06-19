import React, { useState } from 'react';
import { TextField, Button, Link, Paper, Divider, Grid, } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { IsValidEmail } from "../../components/functions/IsValidEmail";
import { Loader } from "../commons/Loader/Loader";
import { Google as GoogleIcon } from '@mui/icons-material';
import { register } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { USER_REGISTER_RESET } from '../../constants/userConstants';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const userRegister = useSelector(state => state.userRegister);
  const { success, userInfo } = userRegister;
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async () => {
    
    setLoading(true); // Start loading

    try {
      dispatch(register(email, password, confirmPassword));
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
        {loading && <Loader />}
        <Typography
            variant="h5"
            sx={{
              fontSize: '1rem',         // Sets the font size to 1rem
              fontStyle: 'italic',       // Makes the font style italic
              fontFamily: 'Cursive',     // Sets the font family to a cursive style
              color: 'deepPurple',       // Sets the font color to deep purple
              textAlign: 'center',       // Centers the text horizontally
            }}
        >
            Unlock your journey, one card at a time. Join us today!
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          Register
        </Button>
        <Grid container alignItems="center" style={{ margin: '20px 0' }}>
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="body2" style={{ padding: '0 10px' }}>
              OR
            </Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
        <Button
          startIcon={<GoogleIcon />}
          fullWidth
          variant="outlined"
          onClick={() => enqueueSnackbar('Google registration not implemented.', { variant: 'info' })}
          style={{ marginBottom: 16 }}
        >
          Register with Google
        </Button>
        <Typography style={{ marginTop: 16, textAlign: 'center' }}>
          Already have an account? <Link href="/glo2go/login">Sign in</Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default SignUp;
