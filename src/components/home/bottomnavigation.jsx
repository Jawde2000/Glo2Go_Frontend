import * as React from 'react';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';  // Assuming you want a logout icon
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
};

const bottomNavStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
};

const BottomNavigationbar = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');  // Adjust according to how you've set your cookies
    Cookies.remove('refreshToken');
    navigate('/glo2go/login');  // Navigate back to the login screen or wherever appropriate
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
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Timelines" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="calendar">
              <CalendarMonthIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="profile">
              <PersonIcon />
            </IconButton>
            {/* Logout Button */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default BottomNavigationbar;
