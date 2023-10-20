import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <Typography variant="h6">
              The page you’re searching for doesn’t exist.
            </Typography>
            <Button variant="contained" component={Link} to="/">Back Home</Button>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFoundPage;