import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import UserChatTileInListCOWs from "./UserChatTileInListCOWS";
import ChatsOWSTile from './ChatsOWSTile';
import NewChatScreen from './NewChatScreen';

export default function ChatsEditor() {
  // State for storing online profiles
  const [allChats, setAllChats] = useState(null);

  // State for managing the socket connection
  // const [socket, setSocket] = useState(() => io.connect('http://192.168.1.13:8000'));
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }))
  // State to manage loading state
  
  const [loading, setLoading] = useState(true);

  // ...

useEffect(() => {
  const fetchOnlineProfiles = () => {
    // Emit 'fetch_profile_chats' event to fetch data
    console.log('fetching again');
    socket.emit('fetch_profile_chats');
  };

  // Fetch online profiles initially
  fetchOnlineProfiles();

  // Setup interval to fetch online profiles every 10 seconds
  const intervalId = setInterval(() => {
    console.log('Interval triggered');
    fetchOnlineProfiles();
  }, 10000);

  // Event listener for fetching online profiles
  socket.on('fetch_profile_chats', (data) => {
    if (data) {
      console.log('Data rdfeceived:', data);
      setAllChats(JSON.parse(data));
      setLoading(false);
    }
  });

  // Check socket connection events
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return () => {
    // Clear the interval on component unmount
    clearInterval(intervalId);

    // Uncomment the line below if you want to disconnect the socket on unmount
    // socket.disconnect();
  };
}, [socket]);  // Include socket in the dependency array

// ...

  return (
    // <Grid container spacing={3}>
    //   <div>chats top most parent1</div>
    //   <Grid item xs={6}>
    //     <Paper style={{ padding: 20, maxHeight: '80vh', overflow: 'auto' }}>
    //       <Typography variant="h5" gutterBottom>
    //         all chats
    //       </Typography>
    //       {/* Show loader if allChats is null */}
    //       {loading && <CircularProgress />}
    //       {/* Show allChats if not null */}
          
    //     </Paper>
    //   </Grid>

    
    // </Grid>
    <div>

      <div >all chats</div>
    {loading && <CircularProgress />}
      {!loading && (
            <Grid container spacing={2}>
              {allChats && (
                    <div style={{marginTop:"10px"}}>
                      <NewChatScreen chats={allChats} sendMsg={()=>{

}} />
                    </div>

              )}
            </Grid>
          )}
    </div>
  );
}
