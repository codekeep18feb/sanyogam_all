import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Your Company Name
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Made with ❤️ by Your Name
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            <a href="#">Privacy Policy</a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}
