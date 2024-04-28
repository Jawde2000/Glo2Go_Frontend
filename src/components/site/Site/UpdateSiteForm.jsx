import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const UpdateSiteForm = () => {
    const [site, setSite] = useState({
        SiteID: '',
        SiteName: '',
        SiteCountry: '',
        SiteAddress: '',
        SiteRating: 0,
        SitePics: [],
        SiteDesc: '',
        SiteOperatingHour: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSite(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Example of handling submit logic to update site details
        alert(`Submitting update for site ID: ${site.SiteID}`);
        // Replace alert with actual API call logic to update site
    };

    const handleDelete = async () => {
        // Example of handling delete logic
        alert(`Deleting site ID: ${site.SiteID}`);
        // Replace alert with actual API call logic to delete site
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: 16, maxWidth: 500 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
                    Update or Delete Site
                </Typography>
                <TextField
                    label="Site ID"
                    fullWidth
                    value={site.SiteID}
                    onChange={handleInputChange}
                    name="SiteID"
                    margin="normal"
                    disabled // assuming you don't want to change the ID
                />
                <TextField
                    label="Site Name"
                    fullWidth
                    value={site.SiteName}
                    onChange={handleInputChange}
                    name="SiteName"
                    margin="normal"
                />
                <TextField
                    label="Country"
                    fullWidth
                    value={site.SiteCountry}
                    onChange={handleInputChange}
                    name="SiteCountry"
                    margin="normal"
                />
                <TextField
                    label="Address"
                    fullWidth
                    value={site.SiteAddress}
                    onChange={handleInputChange}
                    name="SiteAddress"
                    margin="normal"
                />
                <TextField
                    label="Rating"
                    fullWidth
                    type="number"
                    value={site.SiteRating}
                    onChange={handleInputChange}
                    name="SiteRating"
                    margin="normal"
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={site.SiteDesc}
                    onChange={handleInputChange}
                    name="SiteDesc"
                    margin="normal"
                />
                <TextField
                    label="Operating Hours"
                    fullWidth
                    value={site.SiteOperatingHour}
                    onChange={handleInputChange}
                    name="SiteOperatingHour"
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    style={{ marginTop: 16 }}
                >
                    Update Site
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleDelete}
                    style={{ marginTop: 16 }}
                >
                    Delete Site
                </Button>
            </Paper>
        </div>
    );
};

export default UpdateSiteForm;
