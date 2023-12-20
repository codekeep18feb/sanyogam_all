import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import HomeProfileBox from "./HomeProfileBox"
import MatchesFilterScrollBarC from './MatchesFilterScrollBarC';

export default function Users() {
  
  const data = [{"name":"dee"},{"name":"sat"},{"name":"kabhi"}]
  const data_map = data.map(i => (
    <HomeProfileBox imageUrl='https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2' />
  ));

  return (
    <div>
      <div style={{margin:"10px"}}>
      <MatchesFilterScrollBarC />
      </div>
      {data_map}
    </div>
  );
}

function handleSearch() {
  // Handle search logic here
}
