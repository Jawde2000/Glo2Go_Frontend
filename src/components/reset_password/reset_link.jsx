import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button, TextField } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setDialogMessage('Passwords do not match!');
            setDialogOpen(true);
            return;
        }

        setLoading(true);

        try {
            console.log(token);
            console.log(password);
            const response = await axios.put('https://localhost:7262/api/Authentication/UpdatePassword', null, {
                params: {
                  token: token,
                  password: password
                }
            });

            console.log(response);

            if (response.data.flag) {
                setDialogMessage(response.data.message);
                setSubmitted(true);
            } else {
                setDialogMessage('An error occurred, please try again later.');
            }
        } catch (error) {
            console.error("Failed to reset password:", error);
            setDialogMessage('An error occurred, please try again later.');
        } finally {
            setDialogOpen(true);
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        if (submitted) {
            navigate('/glo2go/login');
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
                            textAlign: 'center',
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
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                        </Button>
                    </form>
                </Paper>
            </Box>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{submitted ? "Success" : "Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ResetPassword;
