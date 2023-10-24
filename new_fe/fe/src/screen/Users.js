import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import HomeProfileBox from "./HomeProfileBox"

export default function Users() {
  
  const data = [{"name":"dee"},{"name":"sat"},{"name":"kabhi"}]
  const data_map = data.map(i => (
    <HomeProfileBox imageUrl='https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2' />
  ));

  return (
    <Grid container justifyContent="center" alignItems="center">
      {/* Top Row with Buttons and Search Bar */}
      <Grid item md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "20px"}}>
        <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={handleSearch} sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Search
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Button 1
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Button 2
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Button 3
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Button 4
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: "10px", borderRadius: "5px" }}>
          Button 5
        </Button>
      </Grid>

      {data_map}
    </Grid>
  );
}

function handleSearch() {
  // Handle search logic here
}
