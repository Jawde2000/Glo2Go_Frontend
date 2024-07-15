import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, Avatar,
  Grid, CssBaseline, Box, Divider, Link, CircularProgress
} from "@mui/material";
import { Button, TextField } from '@material-ui/core';
import Glo2goLogo2 from "../../pictures/Glo2goLogo2.png";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { login } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOGOUT } from "../../constants/userConstants";
import Toast from "../commons/Toast"; // Ensure correct import path

function LoginUserScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, error, message } = userLogin || {};

  useEffect(() => {
    const admin = Cookies.get("admin");
    if (userInfo) {
      var user = JSON.parse(userInfo);
      console.log(user);
      if (admin === "true") {
        navigate('/glo2go/admin');
      } else {
        navigate('/glo2go/login/otp/' + user.TravelerEmail);
      }
    }
  }, [navigate, userInfo]);

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error && email && password) {
      setToastMessage("Failed to Login");
      setShowToast(true);
      setLoading(false);
      dispatch({ type: USER_LOGOUT }); // Clear user info on login failure
    } else if (userInfo) {
      setToastMessage(message);
      setShowToast(true);
      setLoading(false);
    }
  }, [error, userInfo, email, password, dispatch]);

  const handleToastClose = () => {
    setShowToast(false);
    if (userInfo) {
      const admin = Cookies.get("admin");
      if (admin === "true") {
        navigate('/glo2go/admin');
      } else {
        navigate('/glo2go/home');
      }
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
          p: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            my: { xs: 2, sm: 4 },
            p: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: { xs: '100%', sm: 400 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: 'primary.main', width: 85, height: 85 }}
            src={Glo2goLogo2}
          />
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontFamily: 'Cursive',
              color: 'deepPurple',
              marginBottom: 4,
            }}
          >
            Navigate the world, one card at a time.
          </Typography>
          <form onSubmit={handleLogin} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address Or Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ width: '100%' }}></Divider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href="/glo2go/signup" variant="body2" style={{ textAlign: 'right' }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Toast
        message={toastMessage}
        duration={3000}
        onClose={handleToastClose}
        open={showToast}
      />
    </Container>
  );
}

export default LoginUserScreen;
