import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, TextField, Button, IconButton, CircularProgress, Typography, Avatar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
    },
    box: {
        backgroundColor: "#f0f0f0",
    },
    avatar: {
        width: 150,
        height: 150,
        margin: 'auto'
    },
}));

const ViewSite = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { siteId } = useParams();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [site, setSite] = useState({
        SiteName: '',
        SiteCountry: '',
        SiteAddress: '',
        SiteDesc: '',
        SiteOperatingHour: ''
    });    

    useEffect(() => {
        const fetchSite = async () => {
        setLoading(true);
        console.log(siteId)
        const url = `https://localhost:7262/api/Site/site`; // Adjust the URL as necessary
        const requestData = {
            SiteID: siteId
        };

        try {
            const response = await axios.post(url, requestData);
            console.log(response); // For debugging purposes
            setSite(response.data);
        } catch (err) {
            setError('Failed to fetch site details: ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

        fetchSite();
    }, [siteId]);

    const handleBack = () => navigate('/admin/glo2go/site');
    const toggleEditMode = () => setEditMode(!editMode);
    const handleChange = (event) => {
        setSite(prevSite => ({
            ...prevSite,
            [event.target.name]: event.target.value
        }));
    };
    

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://localhost:7262/api/Site/UpdateSite`, site);

            if (response.ok) 
            {
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }   
        } catch (error) {
            alert('Failed to update site: ' + error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this site?')) { 
                try {
                    const response = await axios.delete(`https://localhost:7262/api/Site/DeleteSite`, {
                    data: { SiteID: siteId }, // Axios expects `data` for the body in DELETE requests
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        
                console.log(response.data); // Log the response data from axios
        
                if (response.status === 200) { // Check if the status is OK
                    alert(response.data.message);
                } else {
                    alert('Failed to delete site: ' + response.data.message);
                }
                navigate('admin/glo2go/site');
            } catch (error) {
                alert('Failed to delete site.');
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Container className={classes.root}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>Back</Button>
            <Box p={4} className={classes.box}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Avatar src={site?.SitePics?.[0]} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {editMode ? (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Site Name"
                                    name="siteName"
                                    value={site.siteName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Country"
                                    name="siteCountry"
                                    value={site.siteCountry}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Address"
                                    name="siteAddress"
                                    value={site.siteAddress}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Description"
                                    name="siteDesc"
                                    value={site.siteDesc}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Operating Hours"
                                    name="siteOperatingHour"
                                    value={site.siteOperatingHour}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <Typography variant="h6">{site.SiteName}</Typography>
                                <Typography>{site.siteCountry}</Typography>
                                <Typography>{site.siteAddress}</Typography>
                                <Typography>{site.siteDesc}</Typography>
                                <Typography>{site.siteOperatingHour}</Typography>
                            </>
                        )}
                        {editMode ? (
                            <Button startIcon={<SaveIcon />} onClick={handleSave} color="primary">
                                Save
                            </Button>
                        ) : (
                            <Button startIcon={<EditIcon />} onClick={toggleEditMode} color="primary">
                                Edit
                            </Button>
                        )}
                        <Button startIcon={<DeleteIcon />} onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ViewSite;
