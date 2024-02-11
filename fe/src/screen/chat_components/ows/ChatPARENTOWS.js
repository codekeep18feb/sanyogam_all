import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import UserChatTileInListCOWs from "./UserChatTileInListCOWS";

import ChatsEditor from "./ChatsEditor";
import { connect } from "react-redux";

const ChatPARENTOWS = ({ auth_data }) => {
  const [onlineProfiles, setOnlineProfiles] = useState(null);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  const [chat_socket, setChatSocket] = useState(null);





  console.log("ChatPARENTOWS parent of profiles and chats");
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.9:8001', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  const [chat_data, setChat_data] = useState({})
  console.log('HEREISchat_data', chat_data)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOnlineProfiles = () => {
      console.log("fetching again");
      socket.emit("fetch_online_profiles");
    };

    fetchOnlineProfiles();

    const intervalId = setInterval(() => {
      console.log("Interval triggered");
      fetchOnlineProfiles();
    }, 10000);

    // Event listener for fetching online profiles
    socket.on("fetch_online_profiles", (data) => {
      if (data) {
        console.log("Data recdsfeived:", data, typeof data, onlineProfiles);
        const p_data = JSON.parse(data);

        setOnlineProfiles((prevOnlineProfiles) => {
          if (!prevOnlineProfiles) {
            console.log("this should only be running once", onlineProfiles);
            setOnlineProfiles(p_data);
            setLoading(false);
          } else if (
            prevOnlineProfiles &&
            p_data.length != prevOnlineProfiles.length
          ) {
            console.log("wehrewrnrer");
            setOnlineProfiles(p_data);
            setLoading(false);
          }
          return prevOnlineProfiles;
        });
      }
    });


    const connectChatSocket = () => {
      const newChatSocket = io.connect('http://192.168.1.9:8001', {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setChatSocket(newChatSocket);

      return () => {
        newChatSocket.disconnect();
      };
    };

    connectChatSocket();

    return () => {
      // Cleanup on component unmount
      if (socket) {
        socket.disconnect();
        chat_socket.disconnect();
      }
    };


    return () => {
      clearInterval(intervalId);
    };
  }, []); // Include socket in the dependency array


  useEffect(() => {
    if (chat_socket && auth_data && auth_data.id) {
      // Join the room corresponding to my_room
      console.log('AREWEHERERE', auth_data.id)
      chat_socket.emit('join_room', { room: String(auth_data.id) });

      // Event handler for 'new_chat_data_event'
      const handleNewDataEvent = (data) => {
        const p_data = JSON.parse(data)
        console.log("Received data in room", auth_data.id, p_data.msg);



        setChat_data(prv => {
          let cp_prv = JSON.parse(JSON.stringify(prv)); // Deep copy of prv object

          if (cp_prv.hasOwnProperty(p_data.frm_id)) { // Check if key exists in cp_prv
            // If key exists, update its value
            cp_prv[p_data.frm_id] = [...cp_prv[p_data.frm_id], p_data]; // Assuming p_data contains both key and value


          } else {
            // If key does not exist, add it to cp_prv
            cp_prv[p_data.frm_id] = [p_data];
          }

          return cp_prv;
        });
        // Handle the new data as needed
      };

      // Listen for 'new_chat_data_event' events
      chat_socket.on("new_chat_data_event", handleNewDataEvent);

      // Clean up the socket connection on component unmount or when my_room changes
      return () => {
        chat_socket.emit('leave_room', { room: String(auth_data.id) });
        chat_socket.off("new_chat_data_event", handleNewDataEvent);
      };
    }
  }, [chat_socket, auth_data]);


  const all_online_profiles = onlineProfiles && (
    <UserChatTileInListCOWs
      profiles={onlineProfiles}
      SetWithUserId={SetWithUserId}
      SetWithEmail={SetWithEmail}
    />
  );

  const chats_window = (
    // <Paper>
    <>
      {/* <Typography variant="h5" gutterBottom>
        with_userid - {with_userid} - {with_email}
      </Typography> */}
      {with_userid && <ChatsEditor with_userid={with_userid} SetWithUserId={SetWithUserId} all_chats={chat_data[with_userid] || []} />}
    </>
    // </Paper>
  );

  console.log(
    "this should only be running once as of now as we are setting the state only once",
    onlineProfiles
  );
  return (
    <Grid container spacing={3}>
      {!with_userid && (
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20, maxHeight: "80vh", overflow: "auto" }}>
            <Typography variant="h5" gutterBottom>
              Online Profiles
            </Typography>
            {/* Show loader if onlineProfiles is null */}
            {loading && <CircularProgress />}
            {/* Show onlineProfiles if not null */}
            {!loading && all_online_profiles && (
              <Grid container spacing={2}>
                {all_online_profiles}
              </Grid>
            )}
          </Paper>
        </Grid>
      )}

      {with_userid && (
        <Grid container item xs={12} md={8}>
          {chats_window}
        </Grid>
      )}
    </Grid>
  );
}


// export default ChatPARENTOWS
const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

export default connect(mapStateToProps)(ChatPARENTOWS);
