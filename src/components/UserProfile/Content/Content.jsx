import React from 'react';
import { Paper, Box, Tabs, Tab } from '@mui/material';

import AccountSettings from './AccountSettings';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';

const Content = () => {
  const [value, setValue] = React.useState(0);
  const tabs = ['Account Settings', 'Company Settings', 'Notifications'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pt: 5,
        bgcolor: 'white',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'gray.200',
        transform: 'translateY(-100px)',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              label={tab}
              value={index}
              sx={{
                mx: 3,
                px: 0,
                py: 3,
                fontWeight: 'semibold',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                  borderBottom: 1,
                  borderColor: 'primary.main',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 3, mt: 5 }}>
        {value === 0 && <AccountSettings />}
        {value === 1 && <CompanySettings />}
        {value === 2 && <Notifications />}
      </Box>

      <Actions />
    </Paper>
  );
};

export default Content;
