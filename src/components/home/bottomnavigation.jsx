import * as React from 'react';
import { Container } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';


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

  return (
    <div style={containerStyle}>
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
    </div>
  );
}

export default BottomNavigationbar;
