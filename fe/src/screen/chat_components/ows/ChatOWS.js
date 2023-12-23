import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material'; // Import Material-UI components
import UserChatTileInListCOWs from "./UserChatTileInListCOWS"
export default function ChatOWS() {
  // State for storing online profiles
  const [onlineProfiles, setOnlineProfiles] = useState(null);

  // State for managing the socket connection
  const [socket, setSocket] = useState(io.connect('http://192.168.1.13:8000'));

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Event listener for fetching online profiles
    socket.on('fetch_online_profiles', (data) => {
      console.log('Is there any data arriving?', data, typeof (data));
      // Update online profiles state if data is available
      if (data) {
        setOnlineProfiles(JSON.parse(data));
        // Set loading to false once data is received
        setLoading(false);
      }
    });

    // Cleanup function for disconnecting socket when component unmounts
    return () => {
      // Uncomment the line below if you want to disconnect the socket on unmount
      // socket.disconnect();
      console.log('Will this only run if unmounting is happening?');
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

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
              {onlineProfiles &&
                <UserChatTileInListCOWs
                profiles={onlineProfiles}
                // SetWithUserId={SetWithUserId}
                // SetWithEmail={SetWithEmail}
                // with_userid={with_userid}
              />
                }
            </Grid>
          )}
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            ChatBox
          </Typography>
          {/* Right - ChatBox (Can be done after listing online profiles) */}
          {/* Add your ChatBox component here */}
        </Paper>
      </Grid>
    </Grid>
  );
}
