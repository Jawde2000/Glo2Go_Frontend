import React from 'react'
import { Box, Button, Divider } from '@mui/material'

function Actions() {
  return (
    <Box
      sx={{
        mt: 5,
        py: 5,
        px: 8,
        borderTop: 1,
        borderColor: 'grey.300',
      }}
    >
      <Divider sx={{ borderColor: 'grey.300' }} />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Update
      </Button>
    </Box>
  )
}

export default Actions
