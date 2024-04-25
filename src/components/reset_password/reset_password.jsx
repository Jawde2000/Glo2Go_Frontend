import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log('Forgot Password: Email =', email);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } catch (error) {
            setLoading(false);
            alert('An error occurred, please try again later.');
        }
    };

    if (submitted) {
        return (
            <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                    <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 60 }} />
                    <Typography variant="h6" gutterBottom>
                        Reset link sent!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Please check your email to reset your password.
                    </Typography>
                </Box>
            </Container>
        );
    }

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
                  Forgot your password? No worries, click here to reset it.
                </Typography>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Please Enter your registered email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{ shrink: false }}
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

export default ForgotPasswordScreen;
