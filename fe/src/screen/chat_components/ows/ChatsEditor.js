import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NewChatScreen from './NewChatScreen';
import { CircularProgress, Grid } from '@mui/material';

const withSocket = (Component) => {
  return function WithSocketComponent({ with_userid, ...props }) {
    const [socket, setSocket] = useState(
      io.connect('http://192.168.1.13:8000', {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    const [allChats, setAllChats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchOnlineProfiles = () => {
        socket.emit('fetch_profile_chats');
      };

      fetchOnlineProfiles();

      const intervalId = setInterval(() => {
        fetchOnlineProfiles();
      }, 1000);

      socket.on('fetch_profile_chats', (data) => {
        if (data) {
          const pdata = JSON.parse(data);
          console.log('sdfasdf',pdata)
          const f_data = pdata//.filter((i) => (i.frm_user === with_userid));

          setAllChats((prevChats) => {
            if (!prevChats) {
              setAllChats(f_data);
              setLoading(false);
            } else if (prevChats && f_data.length !== prevChats.length) {
              setAllChats(f_data);
              setLoading(false);
            }
            return prevChats;
          });
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
        socket.disconnect();
      };
    }, [socket, with_userid]);

    return <Component allChats={allChats} loading={loading} {...props} />;
  };
};
function ChatsEditor({ allChats, loading, with_email }) {
  const [webrtc_conn, setWebrtc_conn] = useState(null)

  console.log('isreierewr')

  return (
    <div      
    // style={{
    //   // border: "1px solid blue",
    //   // height: "600px",
    //   // // width: "700px",
    //   // background: "rgb(221, 237, 240,0.2)",
    //   position: "fixed",
    //   top: 0,
    //   left: 0,
    //   width: "100%",
    //   height: "100%",
    //   background: "white",
    // }}
    >
      {loading && <CircularProgress />}
      {!loading && (
        <Grid container spacing={2}>
          {allChats && (
              <NewChatScreen chats={allChats} to_email={with_email} />
          )}
        </Grid>
      )}
    </div>
  );
}

export default withSocket(ChatsEditor);
// export default withSocket;
