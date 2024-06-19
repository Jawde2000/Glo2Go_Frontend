import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper"
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';


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
  const userLogin = useSelector(state => state.userLogin)

  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);

  const [value, setValue] = useState(0);
  const {userInfo} = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

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

  const handleLogout = () => {
    dispatch(logout(token))
    navigate('/glo2go/login');  // Navigate back to the login screen 
  };

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
          <BottomNavigationAction component={Link} label="Home" icon={<HomeIcon />} to="/"/>
          <BottomNavigationAction component={Link} label="Timelines" icon={<CalendarMonthIcon />} to="/glo2glo/travelplans"/>
          <BottomNavigationAction component={Link} label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      ) : (
      <AppBar position="static" style={{ backgroundColor: '#FFF', color: '#333' }}>
            <Toolbar style={{ minHeight: '80px' }}> {/* Increased toolbar height for better proportion */}
              <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                <img src={Glo2Go} alt="Logo" style={{ marginLeft: 200,marginRight: 5, width: 75, height: 75 }} />
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
                  {/* <Link to="/glo2go/hotel" style={linkStyle}>Hotel</Link> */}
                  {userInfo? <Link to="/glo2glo/travelplans" style={linkStyle}>Schedule</Link> : null}
                  {userInfo? 
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
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                            <MenuItem component={Link} to={"/glo2go/userprofile"}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                  </div>
                  : 
                  <Link to="/glo2go/login" style={linkStyle}>Login/Register</Link>
                  }
                </>
              )}
            </Toolbar>
          </AppBar>
          )}
        </div>
      );
}

export default UserNavigationbar;
