import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import UserChatTileInListCOWs from './UserChatTileInListCOWS';
import ChatsEditor from './ChatsEditor';

export default function ChatOWS({ chats }) {
  const [onlineProfiles, setOnlineProfiles] = useState(null);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000', {
      query: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
  );

  useEffect(() => {
    const fetchOnlineProfiles = () => {
      socket.emit('fetch_online_profiles');
    };

    fetchOnlineProfiles();

    const intervalId = setInterval(() => {
      fetchOnlineProfiles();
    }, 10000);

    const handleFetchOnlineProfiles = (data) => {
      if (data) {
        console.log('Data received:', data);
        setOnlineProfiles(JSON.parse(data));
        setLoading(false);
      }
    };

    socket.on('fetch_online_profiles', handleFetchOnlineProfiles);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      clearInterval(intervalId);
      socket.off('fetch_online_profiles', handleFetchOnlineProfiles);
      socket.disconnect();
    };
  }, [socket]);

  const allOnlineProfiles =
    onlineProfiles && (
      <UserChatTileInListCOWs
        profiles={onlineProfiles}
        SetWithUserId={SetWithUserId}
        SetWithEmail={SetWithEmail}
      />
    );

  const chatsWindow = (
    <Paper style={{ padding: 20 }}>
      <>
        <Typography variant="h5" gutterBottom>
          with_userid - {with_userid}
        </Typography>
        {with_userid && <ChatsEditor with_userid={with_userid} />}
      </>
    </Paper>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper style={{ padding: 20, maxHeight: '80vh', overflow: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Online Profiles
          </Typography>
          {loading && <CircularProgress />}
          {!loading && (
            <Grid container spacing={2}>
              {allOnlineProfiles}
            </Grid>
          )}
        </Paper>
      </Grid>

      <Grid item xs={6}>
        {chatsWindow}
      </Grid>
    </Grid>
  );
}
