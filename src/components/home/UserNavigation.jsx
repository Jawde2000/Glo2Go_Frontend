import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Grid, TextField, MenuItem, FormControl, InputLabel, Select,
  Button, Typography, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Avatar
} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Glo2Go from '../../pictures/Glo2goLogo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import axios from 'axios'

const containerStyle = {
  position: 'relative',
};

const bottomNavStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
};

const UserNavigationbar = () => {
  const anchorRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userLogin = useSelector(state => state.userLogin);
  const userUpdate = useSelector(state => state.userUpdate);
  const { message, success } = userUpdate;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const prevOpen = useRef(open);

  const [value, setValue] = useState(0);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  // Initialize state with default values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (userInfo) {
      var data = JSON.parse(userInfo);
      setUser(data);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout(token));
    navigate('/glo2go/login');
  };

  const linkStyle = {
    margin: '0 30px',
    fontSize: '18px',
    color: 'inherit',
    textDecoration: 'none'
  };

  const iconButtonStyle = {
    marginLeft: '20px',
    marginRight: '20px',
    padding: '12px',
  };

  // Modal state and handlers
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = async () => {
    console.log(userInfo);
    if (userInfo) {
      try {
        const data = JSON.parse(userInfo);
  
        // Make sure the URL is correctly formatted
        const response = await axios.post(`https://localhost:7262/api/Authentication/userinfo`, {
          travelerEmail: data.TravelerEmail
        });
  
        console.log(response.data); // Ensure response.data contains the expected user info

        const datas = response.data;
  
        setUser(datas);
        setFirstName(datas?.firstName || '');
        setLastName(datas?.lastName || '');
        setGender(datas?.gender); // Assuming 3 is a default value for gender if not provided
        setProfilePic(datas?.profilePic || '');
        setEmail(datas?.travelerEmail);
        setModalOpen(true);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error as needed (e.g., set default values or show error message)
      }
    }
  };

  const handleReport = async () => {
    navigate("/glo2go/report/" + user.TravelerEmail);
  };

  const handleModalClose = async () => {
    setUser();
    setFirstName('');
    setLastName('');
    setGender('');
    setProfilePic('');
    setModalOpen(false);
  };

  const handleModalSubmit = () => {
    if (firstName || lastName || gender) {
      const userUpdateDTO = {
        TravelerEmail: email,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        ProfilePic: profilePic
      };
      dispatch(updateUserProfile(userUpdateDTO));
    }
  };

  return (
    <div style={containerStyle}>
      {isMobile ? (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={bottomNavStyle}
        >
          <BottomNavigationAction component={Link} label="Home" icon={<HomeIcon />} to="/" />
          <BottomNavigationAction component={Link} label="Timelines" icon={<CalendarMonthIcon />} to="/glo2glo/travelplans" />
          <BottomNavigationAction component={Link} label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      ) : (
        <AppBar position="static" style={{ backgroundColor: '#FFF', color: '#333' }}>
          <Toolbar style={{ minHeight: '80px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
              <img src={Glo2Go} alt="Logo" style={{ marginLeft: 200, marginRight: 5, width: 75, height: 75 }} />
              <Typography style={{ fontWeight: 'bold', fontSize: 40 }}>Glo2Go</Typography>
            </Link>
            <div style={{ flexGrow: 1 }} />
            {isMobile ? (
              <IconButton edge="end" color="inherit" aria-label="menu" style={iconButtonStyle}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Link to="/" style={linkStyle}>Home</Link>
                {userInfo && <Link to="/glo2glo/travelplans" style={linkStyle}>Schedule</Link>}
                {userInfo ? (
                  <div>
                    <Button
                      style={{ ...linkStyle, textTransform: 'none' }}
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? 'composition-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      Profile
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={handleModalOpen}>My account</MenuItem>
                                <MenuItem onClick={handleReport}>Report</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                ) : (
                  <Link to="/glo2go/login" style={linkStyle}>Login/Register</Link>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Profile</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="emailAddress"
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    id="gender"
                    label="Gender"
                    value={Number(gender)}
                    onChange={(e) => setGender(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleModalSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserNavigationbar;
