import VideoCallIcon from "@mui/icons-material/VideoCall";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AudioCallIcon from "@mui/icons-material/Call";
import { connect } from "react-redux";
import io from "socket.io-client";

import { ImageCircle } from "../../chat_components/ImageCircle";

import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';

const makeTriggerCall = async (with_userid,frm_id,message) => {
  try {
    const data = {
      "frm_id": frm_id,
      "to_id": with_userid,
      "message": message
    }
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    console.log('here is tokene',token)
    const response = await fetch(
      `http://192.168.1.13:8001/new_data_event_trigger/${with_userid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),

      }
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully fetched user");
      return data
    } else {
      console.log("Error fetching chat history");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // setLoading(false);
  }
};

const getRequestUID = async (with_userid, token) => {
  try {
    // const data = {
    //   "frm_id": frm_id,
    //   "to_id": with_userid,
    //   "message": message
    // }
    const response = await fetch(
      `http://192.168.1.13:8000/api/get_request_info_by_id/${with_userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        // body: JSON.stringify(data),

      }
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully fetched user");
      return data
    } else {
      console.log("Error fetching chat history");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // setLoading(false);
  }
};

const ChatsEditor = ({ auth_data, with_userid }) => {
  const [socket, setSocket] = useState(null);
  const [my_room, setMyRoomAs] = useState(null);
  const [message, setMessage] = useState("");
  const [dependentVariable, setDependentVariable] = useState("dependent");
  const [chat_data, setChat_data] = useState([])
  const connectSocket = () => {
    console.log(dependentVariable); // Using dependentVariable in connectSocket

    const newSocket = io.connect('http://192.168.1.13:8001', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  };

  useEffect(() => {
    const connectSocket = () => {
      const newSocket = io.connect('http://192.168.1.13:8001', {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    };

    connectSocket();

    return () => {
      // Cleanup on component unmount
      if (socket) {
        socket.disconnect();
      }
    };
  }, []); // Empty dependency array to run only on mount and unmount

  useEffect(() => {
    const updateRoom = async () => {
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;
      const request_d = await getRequestUID(with_userid, token);
      setMyRoomAs(request_d.id);
    };

    updateRoom();
  }, [with_userid]);

  useEffect(() => {
    if (socket && my_room) {
      // Join the room corresponding to my_room
      socket.emit('join_room', { room: String(my_room) });

      // Event handler for 'new_data_event'
      const handleNewDataEvent = (msg) => {
        console.log("Received data in room", my_room, msg);
        setChat_data(prv=>{
          let cp_prv = JSON.parse(JSON.stringify(prv))
          cp_prv.push(msg)
          return cp_prv
        })
        // Handle the new data as needed
      };

      // Listen for 'new_data_event' events
      socket.on("new_data_event", handleNewDataEvent);

      // Clean up the socket connection on component unmount or when my_room changes
      return () => {
        socket.emit('leave_room', { room: String(my_room) });
        socket.off("new_data_event", handleNewDataEvent);
      };
    }
  }, [socket, my_room]);

  const handleSubmit = () => {
    // Handle the submission of the message
    console.log("Submitted message:", message);
    makeTriggerCall(with_userid, auth_data.id, message);
  };

  const all_chats = chat_data.map(i=>{
    return(
      <div>{i}</div>
    )
  })

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <ArrowBackIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6">{auth_data.username}</Typography>
        </Grid>
        <Grid item>
          <VideoCallIcon />
        </Grid>
        <Grid item>
          <AudioCallIcon />
        </Grid>
      </Grid>
      {all_chats}
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

export default connect(mapStateToProps)(ChatsEditor);
