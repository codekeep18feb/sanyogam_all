import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import HomeProfileBox from "./HomeProfileBox"
import { Typography } from '@mui/material';

export default function RecomUsers() {
  
  const data = [{"name":"dee"},{"name":"sat"},{"name":"kabhi"}]
  const data_map = data.map(i => (
    <Grid item>
      <HomeProfileBox imageUrl='https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2' />
    </Grid>
  ));

  return (
    <div style={{margin:"50px 0"}}>
      

      
      <Typography variant="h3" style={{  "font-weight": "500",margin:"10px 0 20px 0"}}>Recommanded for U :)</Typography>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>

        {data_map}
      </Grid>
    </div>

    
  );
}

function handleSearch() {
  // Handle search logic here
}
