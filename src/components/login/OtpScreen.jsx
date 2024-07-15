import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, CircularProgress, IconButton } from '@mui/material';
import { Button, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { USER_LOGOUT } from '../../constants/userConstants';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

function OtpScreen() {
    const { email } = useParams();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(otp);
        setLoading(true);
        console.log(email);
        try {
            const response = await axios.post('https://localhost:7262/api/authentication/otp', null, {
                params: {
                    otp: otp,
                    user: email
                }
            });

            console.log(response);

            if (response.data.flag) {
                alert('OTP verified successfully!');
                // Navigate to the next step, e.g., reset password page
                navigate('/glo2go/home');
            } else {
                setLoading(false);
                alert(response.data.message);
                Cookies.remove('admin'); 
                Cookies.remove('refreshToken');
                Cookies.remove('token');
                Cookies.remove('userinfo');
                localStorage.removeItem('persist:root');
                dispatch({type: USER_LOGOUT});
            }
        } catch (error) {
            setLoading(false);
            alert('An error occurred, please try again later.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                <ArrowBackIcon />
            </IconButton>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <Paper elevation={6} style={{ padding: 20, width: '100%', maxWidth: 400 }}>
                    <Typography
                        component="h4"
                        variant="h5"
                        sx={{
                            fontSize: '1rem',
                            fontStyle: 'italic',
                            fontFamily: 'Cursive',
                            color: 'deepPurple',
                            textAlign: 'center',       // Centers the text horizontally
                            marginBottom: 4,
                        }}
                    >
                        Enter your OTP code
                    </Typography>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="6-digit OTP"
                            name="otp"
                            autoComplete="off"
                            autoFocus
                            value={otp}
                            onChange={handleOtpChange}
                            inputProps={{ maxLength: 6 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            style={{ margin: '20px 0' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default OtpScreen;
