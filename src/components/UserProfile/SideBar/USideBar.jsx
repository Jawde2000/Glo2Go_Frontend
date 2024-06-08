import React from 'react'
import { Box, Paper } from '@mui/material'

import Actions from './Actions';
import Data from './Data';
import Profile from './UProfile';

function USidebar() {
  return (
    <Paper
      component="aside"
      sx={{
        flex: 1,
        mr: { xs: 0, md: 5 },
        mb: { xs: 5, md: 0 },
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: 1,
        borderColor: 'grey.300',
        transform: 'translateY(-100px)',
      }}
    >
      <Profile />
      <Data />
      <Actions />
    </Paper>
  )
}

export default USidebar
