import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function NotFoundPage() {
  return (
  
    <Grid container sx={{ paddingTop: 5 }}>
  <Grid item xs={12} sx={{ paddingLeft: 3 }}>
    <Typography variant="subtitle2">
      The page you’re searching for doesn’t exist.
    </Typography>
  </Grid>
  <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 3 }}>
    <img
      src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
      alt=""
      style={{ maxWidth: "80%", maxHeight: "80%", width: "auto", height: "auto" }}
    />
  </Grid>
  <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 3 }}>
    <Button variant="contained" component={Link} to="/">
      Back Home
    </Button>
  </Grid>
</Grid>

  );
}

export default NotFoundPage;