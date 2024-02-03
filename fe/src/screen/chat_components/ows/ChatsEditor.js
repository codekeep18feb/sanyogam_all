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
    const response = await fetch(
      `http://192.168.1.13:8001/new_data_event_trigger/${with_userid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token,
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
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8001', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  

  // useEffect(() => {
    

  //   socket.on("new_data_event", (data) => {
  //     if (data) {
  //       console.log("dafsuyiiuytfasd", data, typeof data);
  //       if (data) {
  //         const p_data = JSON.parse(data);
  //         const d_type = myRef && myRef.current ? myRef.current.type : null;
  //         console.log("amiherenow", p_data);
  //         let ret_data = ifMyDataExist(
  //           p_data,
  //           (with_userid = with_userid),
  //           auth_data.id,
  //           true
  //         );
  //         // const ret_data2 = ifMyDataExist(p_data,auth_data.id,with_userid=with_userid,false)
  //         console.log(signal_pool, "ret_dsfsddata", ret_data);
  //         if (ret_data) {
  //           setSignalPool(ret_data);
  //         }
  //       }
  //       const pdata = JSON.parse(data);
  //       console.log("abcdef", pdata, myRef, with_userid);
  //     }
  //   });

  //   socket.on("connect", () => {
  //     console.log("Socket_pool connected");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Socket_pool disconnected");
  //     // nagivate(-1);

  //   });

  //   return () => {
  //     socket.disconnect();
  //     clearInterval(intervalId);
  //   };
  // }, [socket]);

  
  const [my_room, setMyRoomAs] = useState(null)
  console.log('myroom',my_room)
  useEffect(async() => {

    // Join the room corresponding to for_roomid
    // socket.emit('join_room', { room: my_room });

    // // Event handler for 'new_data_event'
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    const request_d = await getRequestUID(with_userid,token)
    console.log('can you grab request.id',request_d.id)
    setMyRoomAs(request_d.id)
    

    // Listen for 'new_data_event' events
    

  }, [with_userid]); // Include for_roomid in the dependency array

  useEffect(() => {
    const handleNewDataEvent = (data) => {
      console.log("new msg recieved on socket.");

      // Handle the new data as needed
    };
    
    socket.on("new_data_event", handleNewDataEvent);

    // Clean up the socket connection on component unmount
    return () => {
      // Leave the room when the component unmounts
      // socket.emit('leave_room', { room: my_room });
      socket.disconnect();
    };

  }, [my_room])
  

  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Handle the submission of the message, you can dispatch an action or perform any other logic here.
    console.log("Submitted message:", message);
    makeTriggerCall(with_userid,auth_data.id,message)


  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          {/* {JSON.stringify(auth_data.id)} */}
          <ArrowBackIcon />
        </Grid>
        <Grid item>
          {/* <ImageCircle /> */}
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
