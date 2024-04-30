import React from 'react';
import { Link, Container, Grid, Box } from '@material-ui/core';
import PaymentIcon from 'react-payment-icons';
import { Divider } from '@mui/material';

function Footer() {
    return (
        <footer>
            <Box pt={2} pb={2}> {/* Adds padding top and bottom */}
                <Divider />
            </Box>
            <Box bgcolor="#98DDCA" color="white" px={{xs: 3, sm:7}} py={{xs:5, sm:7}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Customer Support</Box>
                            <Box style={{ paddingTop: 10, paddingBottom: 5 }}>
                                <Link href="/contact" color="inherit" underline="none">
                                    Contact Us
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/faq" color="inherit" underline="none">
                                    FAQs
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>About Glo2Go</Box>
                            <Box style={{ paddingTop: 10, paddingBottom: 5 }}>
                                <Link href="/about" color="inherit" underline="none">
                                    Our Story
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/terms" color="inherit" underline="none">
                                    Terms of Service
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Connect with Us</Box>
                            <Box style={{ paddingTop: 10, paddingBottom: 5 }}>
                                <Link href="https://twitter.com/glo2go" color="inherit" underline="none">
                                    Twitter
                                </Link>
                            </Box>
                            <Box style={{ paddingBottom: 5 }}>
                                <Link href="https://facebook.com/glo2go" color="inherit" underline="none">
                                    Facebook
                                </Link>
                            </Box>
                            <Box>
                                <Link href="https://instagram.com/glo2go" color="inherit" underline="none">
                                    Instagram
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Secure Payments</Box>
                            <Box>
                                <PaymentIcon
                                    id="visa"
                                    style={{ margin: 10, width: 50, filter: 'brightness(0) invert(1)' }}
                                    className="payment-icon"
                                />
                                <PaymentIcon
                                    id="mastercard"
                                    style={{ margin: 10, width: 50, filter: 'brightness(0) invert(1)' }}
                                    className="payment-icon"
                                />
                                <PaymentIcon
                                    id="paypal"
                                    style={{ margin: 10, width: 50, filter: 'brightness(0) invert(1)' }}
                                    className="payment-icon"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }}>
                        Glo2Go &reg; {new Date().getFullYear()}
                    </Box>
                    <Box textAlign="center" pb={{ xs: 5, sm: 0 }}>
                        All Rights Reserved by Glo2Go Adventures
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;
