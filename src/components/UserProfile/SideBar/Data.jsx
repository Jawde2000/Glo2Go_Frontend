import React from 'react'
import { Box, Typography, List, ListItem, Divider } from '@mui/material'

const list = [
  {
    id: 1,
    name: 'Opportunities applied',
    value: 32,
    color: 'yellow',
  },
  {
    id: 2,
    name: 'Opportunities won',
    value: 26,
    color: 'green',
  },
  {
    id: 3,
    name: 'Current opportunities',
    value: 6,
    color: 'cadet',
  },
]

function Data() {
  return (
    <List sx={{ width: '100%', padding: 0 }}>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 3,
              px: 5,
              borderBottom: 1,
              borderColor: 'grey.300',
            }}
          >
            <Typography color="text.primary">{item.name}</Typography>
            <Typography color={item.color} fontWeight="bold">
              {item.value}
            </Typography>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}

export default Data
