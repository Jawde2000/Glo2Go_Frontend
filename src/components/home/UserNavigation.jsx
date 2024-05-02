import React, { useEffect, useState } from 'react';
import { Container, useMediaQuery, useTheme } from '@mui/material';
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
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../actions/userActions';
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
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin;
  const [isLogged, setLogged] = useState(false);

  const handleLogout = () => {
    Cookies.remove('admin'); 
    Cookies.remove('refreshToken');
    Cookies.remove('token');
    Cookies.remove('userinfo');
    dispatch(logout())
    navigate('/glo2go/login');  // Navigate back to the login screen 
  };

  useEffect(() => {
    console.log("User Info:", userInfo);
    if (userInfo) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [userInfo]);


    // Styles for links and icons
  const linkStyle = {
    margin: '0 30px', // Increased spacing
    fontSize: '18px', // Larger font for better readability
    color: 'inherit',
    textDecoration: 'none'
  };
  
  const iconButtonStyle = {
    marginLeft: '20px', // Space between icons
    marginRight: '20px',
    padding: '12px', // Larger clickable area
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
      <AppBar position="static" style={{ backgroundColor: '#FFF', color: '#333' }}>
            <Toolbar style={{ minHeight: '80px' }}> {/* Increased toolbar height for better proportion */}
              <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                <img src={Glo2Go} alt="Logo" style={{ marginLeft: 200,marginRight: 5, width: 75, height: 75 }} />
                <span style={{ fontWeight: 'bold', fontSize: 40 }}>Glo2Go</span>
              </Link>
              <div style={{ flexGrow: 1 }} />
              {isMobile ? (
                <IconButton edge="end" color="inherit" aria-label="menu" style={iconButtonStyle}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Link to="/" style={linkStyle}>Home</Link>
                  <Link to="/calendar" style={linkStyle}>Schedule</Link>
                  {userInfo? 
                  <Link to="/profile" style={linkStyle}>Profile</Link> : 
                  <Link to="/glo2go/login" style={linkStyle}>Login/Register</Link>
                  }
                  {userInfo? <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="logout"
                    onClick={handleLogout}
                    style={iconButtonStyle}
                  >
                    <LogoutIcon />
                  </IconButton> : null}
                </>
              )}
            </Toolbar>
          </AppBar>
          )}
        </div>
      );
}

export default UserNavigationbar;
