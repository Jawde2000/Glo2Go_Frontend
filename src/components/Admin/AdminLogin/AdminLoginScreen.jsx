import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Avatar, TextField,
  Button, Grid, CssBaseline, Box, Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLogo from '../../../pictures/Glo2goLogo.png';
import Cookies from 'js-cookie';
import { Cookie } from '@mui/icons-material';
import {useSelector} from 'react-redux'

function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (Cookies.get('token') && Cookies.get('admin')) {
      navigate('/admin/glo2go/dashboard');
    }
  }, [navigate]);

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    try {

      console.log(password);
      const response = await axios.post('https://localhost:7262/api/authentication/admin/login', {
        email: email,
        password: password,
      }, { withCredentials: true });

      console.log(response.data);

      if (response.data.flag) {
        console.log("Enter")
        Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict', secure: true });
        
        // Convert the object to a string before storing it in cookies
        Cookies.set('userinfo', JSON.stringify(response.data.data), { sameSite: 'Strict', secure: true });

        Cookies.set('admin', true, { sameSite: 'Strict', secure: true });
        Cookies.set('token', response.data.token, { sameSite: 'Strict', secure: true });
        
        alert(response.data.message); // Assuming message is directly under data
        navigate("/admin/glo2go/dashboard");
      } else {
        alert(response.data.message); // Assuming message is directly under data for consistency
      }
    } catch (error) {
      console.error("Admin login error:", error.response);
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
};


  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            my: 4,
            p: 3,
            width: 1,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={AdminLogo}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Portal
          </Typography>
          <form onSubmit={handleAdminLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/admin/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AdminLoginScreen;
