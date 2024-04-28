import React, { useState } from 'react';
import { TextField, Button, Link, Paper, Divider, Grid, } from '@material-ui/core';
import { Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { IsValidEmail } from "../../components/functions/IsValidEmail";
import { Loader } from "../commons/Loader/Loader";
import { Google as GoogleIcon } from '@mui/icons-material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async () => {
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://localhost:7262/api/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
          ConfirmPass: confirmPassword,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // enqueueSnackbar(data.message, { variant: 'success' });
        alert(data.message);
      } else {
        // enqueueSnackbar(data.message || "Registration failed. Please try again.", { variant: 'error' });

        alert(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
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
