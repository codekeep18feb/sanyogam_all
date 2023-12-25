import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import UserChatTileInListCOWs from "./UserChatTileInListCOWS";
import ChatsOWSTile from './ChatsOWSTile';
import ChatsEditor from './ChatsEditor';

export default function ChatPARENTOWS() {
  // State for storing online profiles
  const [onlineProfiles, setOnlineProfiles] = useState(null);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  console.log('ChatPARENTOWS parent of profiles and chats')

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
      // Emit 'fetch_online_profiles' event to fetch data
      console.log('fetching again');
      socket.emit('fetch_online_profiles');
    };

    // Fetch online profiles initially
    fetchOnlineProfiles();

    // Setup interval to fetch online profiles every 10 seconds
    const intervalId = setInterval(() => {
      console.log('Interval triggered');
      fetchOnlineProfiles();
    }, 10000);

    // Event listener for fetching online profiles
    socket.on('fetch_online_profiles', (data) => {
      if (data) {
        console.log('Data recdsfeived:', data,typeof(data),onlineProfiles);
        // setOnlineProfiles(p_data);
        // setLoading(false);
        const p_data = JSON.parse(data);

        setOnlineProfiles((prevOnlineProfiles) => {
          // Use functional update to ensure the latest state is used
          // if (!prevOnlineProfiles) {
          //   console.log('this should only be running once', prevOnlineProfiles);
          //   return p_data;
          // }
          // Add other conditions as needed
          if (!prevOnlineProfiles){
          console.log('this should only be running once',onlineProfiles)
          setOnlineProfiles(p_data);
          setLoading(false);
    
          }
          else if (prevOnlineProfiles && p_data.length!=prevOnlineProfiles.length){
            console.log('wehrewrnrer')
            setOnlineProfiles(p_data);
            setLoading(false);
          
          }
          return prevOnlineProfiles;
        });
        // if (!onlineProfiles){
        //   console.log('this should only be running once',onlineProfiles)
        //   setOnlineProfiles(p_data);
        //   // setLoading(false);
  
        // }
        // else if (onlineProfiles && p_data.length!=onlineProfiles.length){
        //   console.log('wehrewrnrer')
        //   setOnlineProfiles(p_data);
        //   setLoading(false);
        
        // }
      }
    });

    // // Check socket connection events
    // socket.on('connect', () => {
    //   console.log('Socket connected');
    // });

    // socket.on('disconnect', () => {
    //   console.log('Socket disconnected');
    // });

    return () => {
      // Clear the interval on component unmount
      clearInterval(intervalId);

      // Uncomment the line below if you want to disconnect the socket on unmount
      // socket.disconnect();
    };
  }, []);  // Include socket in the dependency array

  const all_online_profiles = onlineProfiles && (
    <UserChatTileInListCOWs
      profiles={onlineProfiles}
      SetWithUserId={SetWithUserId}
      SetWithEmail={SetWithEmail}
    // with_userid={with_userid}
    />
  )

  const chats_window = (<Paper style={{ padding: 20 }}>
    <>
    <Typography variant="h5" gutterBottom>
    with_userid - {with_userid} - {with_email}
    </Typography>
    {with_userid && <ChatsEditor with_userid={with_userid} with_email={with_email}/>}
    </>
  </Paper>)
  
  console.log('this should only be running once as of now as we are setting the state only once',onlineProfiles)
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper style={{ padding: 20, maxHeight: '80vh', overflow: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Online Profiles
          </Typography>
          {/* Show loader if onlineProfiles is null */}
          {loading && <CircularProgress />}
          {/* Show onlineProfiles if not null */}
          {!loading && (
            <Grid container spacing={2}>
              {all_online_profiles}
            </Grid>
          )}
        </Paper>
      </Grid>

      <Grid item xs={6}>
        {chats_window}
      </Grid>
    </Grid>
  );
}
