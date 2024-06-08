import React from 'react';
import { Container, Grid } from '@mui/material';
import Content from './Content/Content';
import USidebar from './SideBar/USideBar';

export default function UserProfile() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <USidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Content />
        </Grid>
      </Grid>
    </Container>
  );
}
