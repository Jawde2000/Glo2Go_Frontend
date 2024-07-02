import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemButton,
  ListItemText, Divider, CssBaseline, Avatar, TextField, MenuItem, FormControl, InputLabel, Select,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUserProfile } from '../../../actions/userActions';
import axios from 'axios';
import { USER_UPDATE_RESET } from '../../../constants/userConstants';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      marginLeft: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const AppBarCustom = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function SideBar({ open, handleDrawerOpen, handleDrawerClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const userUpdate = useSelector(state => state.userUpdate);
  const { userInfo } = userLogin;

  const [modalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');

  const handleModalOpen = async () => {
    console.log("enter handle modal open");
    if (userInfo) {
      try {
        const data = JSON.parse(userInfo);
        const response = await axios.post(`https://localhost:7262/api/Authentication/userinfo`, {
          travelerEmail: data.TravelerEmail
        });

        const userData = response.data;
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setGender(userData?.gender);
        setProfilePic(userData?.profilePic || '');
        setEmail(userData?.travelerEmail);
        setModalOpen(true);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  const handleModalClose = () => {
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/glo2go/login');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/glo2go/login');
    }
  }, [userInfo, navigate]);

  const handleTabClick = (link) => {
    handleDrawerClose();
    navigate(link);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarCustom position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBarCustom>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{ icon: <HomeOutlinedIcon />, text: 'Dashboard', link: '/' },
            { icon: <LocationOnIcon />, text: 'Manage Site', link: '/admin/glo2go/site' },
            { icon: <PeopleOutlinedIcon />, text: 'Manage User', link: '/admin/glo2go/dashboard/travellist' },
            { icon: <ReportProblemIcon />, text: 'Reports', link: '/admin/glo2go/dashboard/reportlist' },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleTabClick(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleModalOpen}>
              <ListItemIcon>
                <PersonOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
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
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
          <Button onClick={handleModalClose} color="secondary">Cancel</Button>
          <Button onClick={handleModalSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Main open={open}>
        <DrawerHeader />
        {/* Content goes here */}
      </Main>
    </Box>
  );
}
