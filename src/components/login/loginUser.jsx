import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, Avatar, TextField,
  Button, Grid, CssBaseline, Box, Divider, Link,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import Glo2goLogo2 from "../../pictures/Glo2goLogo2.png";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { login } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

function LoginUserScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogged, setLogged] = useState(false);

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin;

  useEffect(() => {
    const admin = Cookies.get("admin");
    if (userInfo) {
      if (admin === "true") {
        navigate('/glo2go/admin');
      } else {
        navigate('/glo2go/home');
      }
    } 
  }, [navigate, userInfo]);

  axios.defaults.withCredentials = true;
  

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
        p: { xs: 2, sm: 4 }, // Adjust padding for small screens
      }}
    >
      <Paper
        elevation={6}
        sx={{
          my: { xs: 2, sm: 4 }, // Smaller margin on smaller screens
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: { xs: '100%', sm: 400 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Avatar
            sx={{ m: 1, bgcolor: 'primary.main', width: 85, height: 85 , alignItems: 'center'}}
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
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ width: '100%' }}>OR</Divider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                >
                  Sign in with Google
                </Button>
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
    </Container>
  );
}

export default LoginUserScreen;
