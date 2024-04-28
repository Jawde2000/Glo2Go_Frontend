import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, CircularProgress, TextField, Button } from '@mui/material';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');

    // Extract the token from the URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7262/api/Authentication/resetpassword', {
                token,
                password
            });

            if (response.data.success) {
                alert('Password reset successful!');
            } else {
                alert('An error occurred, please try again later.');
            }
        } catch (error) {
            console.error("Failed to reset password:", error);
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
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
                        Reset your password
                    </Typography>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="New Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ margin: '20px 0' }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default ResetPassword;
