// SocketWrapper.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Grid, CircularProgress } from '@mui/material';
import NewChatScreen from './NewChatScreen';

// SocketWrapper.js
const SocketWrapper = ({ with_userid, handleFetchedData, children }) => {
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnlineProfiles = () => {
      socket.emit('fetch_profile_chats');
    };

    fetchOnlineProfiles();

    const intervalId = setInterval(() => {
      fetchOnlineProfiles();
    }, 10000);

    socket.on('fetch_profile_chats', (data) => {
      if (data) {
        const pdata = JSON.parse(data);
        const f_data = pdata.filter((i) => i.frm_user == with_userid || i.to_user == with_userid);
        // Call the handleFetchedData function passed as a prop to handle the fetched data
        handleFetchedData(f_data);
        setLoading(false);
      }
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [socket, with_userid, handleFetchedData]);

  return <>{children}</>;
};

// export default SocketWrapper;


// export default SocketWrapper;

const ChatsEditor = ({ with_userid }) => {
  const [allChats, setAllChats] = useState(null);

  // Function to handle the fetched data
  const handleFetchedData = (data) => {
    setAllChats(data);
  };

  return (
    <SocketWrapper with_userid={with_userid} handleFetchedData={handleFetchedData}>
      <div>
        <div>all chats</div>
        {allChats && (
          <Grid container spacing={2}>
            <div style={{ marginTop: "10px" }}>
              <NewChatScreen chats={allChats} sendMsg={() => {}} />
            </div>
          </Grid>
        )}
        {allChats === null && <CircularProgress />}
      </div>
    </SocketWrapper>
  );
};

export default ChatsEditor;