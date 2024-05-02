import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// Icon Imports
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../../actions/userActions';

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
  function handleLogout () {
    Cookies.remove('admin'); 
    Cookies.remove('refreshToken');
    Cookies.remove('token');
    Cookies.remove('userinfo');
    dispatch(logout())
    // Use React Router's navigate function to redirect to the login page
    navigate('/admin/glo2go/login'); // Adjust the route as necessary
  };

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo, admin} = userLogin;

  useEffect(() => {
    console.log(userInfo);
    console.log(admin);
    // Additional logic to handle user state changes
  }, [userInfo, admin]); // Dependency array includes userInfo and admin

  useEffect(() => {
    if(!userInfo) {
      navigate('/admin/glo2go/login');
    }
  },[userInfo])

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
            { icon: <ContactsOutlinedIcon />, text: 'Contacts', link: '/contacts' },
            { icon: <ReceiptOutlinedIcon />, text: 'Invoices', link: '/invoices' },
            { icon: <PersonOutlinedIcon />, text: 'Profile', link: '/profile' },
            { icon: <CalendarTodayOutlinedIcon />, text: 'Calendar', link: '/calendar' },
            { icon: <HelpOutlineOutlinedIcon />, text: 'FAQ', link: '/faq' },
            { icon: <BarChartOutlinedIcon />, text: 'Bar Chart', link: '/bar-chart' },
            { icon: <PieChartOutlineOutlinedIcon />, text: 'Pie Chart', link: '/pie-chart' },
            { icon: <TimelineOutlinedIcon />, text: 'Timeline', link: '/timeline' },
            { icon: <MapOutlinedIcon />, text: 'Geography', link: '/geography' }].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component="a" href={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
           <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon >
                  <LogoutIcon />
                </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
