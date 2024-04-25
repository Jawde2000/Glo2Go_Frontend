import React, { useState } from 'react';
import { Container, TextField, Button, Link, Paper, Divider, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Loader } from "../commons/Loader/Loader";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7262/api/authentication/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password, ConfirmPass: confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={6} style={{ padding: 20, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {loading && <Loader />}
          <Typography variant="h4" 
            sx={{
                fontSize: '1rem',
                fontStyle: 'italic',
                fontFamily: 'Cursive',
                color: 'deepPurple',
                textAlign: 'center',
            }}
          >
            Unlock your journey, one card at a time. Join us today!
          </Typography>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" fullWidth type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField label="Confirm Password" fullWidth type="password" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister} disabled={loading} style={{ marginTop: 16 }}>
            Register
          </Button>
          <Divider style={{ width: '100%', margin: '20px 0' }} />
          <Button startIcon={<GoogleIcon />} fullWidth variant="outlined" onClick={() => enqueueSnackbar('Google registration not implemented.', { variant: 'info' })}>
            Register with Google
          </Button>
          <Typography style={{ marginTop: 20 }}>
            Already have an account? <Link href="/glo2go/login">Sign in</Link>
          </Typography>
        </Paper>
      </div>
    </Container>
  );
};

export default SignUp;
