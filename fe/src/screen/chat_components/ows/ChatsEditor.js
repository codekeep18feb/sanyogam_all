import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AudioCallIcon from "@mui/icons-material/Call";
import { connect } from "react-redux";
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';

import { ImageCircle } from "../../chat_components/ImageCircle";

import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useReducer, useState } from 'react';
import WrapperChatShellWithSend from "../../WrapperChatShellWithSend";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhoneCallUI from "../../PhoneCallUI";

const makeTriggerCall = async (with_userid, frm_id, message) => {
  try {
    const data = {
      "frm_id": frm_id,
      "to_id": with_userid,
      "message": message
    }
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    console.log('dsfhere is with_userid', with_userid)
    const response = await fetch(
      `http://192.168.1.9:8001/new_data_event_trigger/${with_userid}`,
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh', // Set the container height to 100% of the viewport height
    overflowY: 'auto', // Add vertical scrollbar if content overflows
  },
  segment1: {
    flex: '0 0 10%', // 10% height, don't grow or shrink
    backgroundColor: 'lightblue',
  },
  segment2: {
    flex: '1 0 80%', // 80% height, grow as needed, don't shrink
    backgroundColor: 'lightgreen',
  },
  segment3: {
    flex: '0 0 10%', // 10% height, don't grow or shrink
    backgroundColor: 'lightcoral',
  },
  bottom: {
    position: 'sticky',
    bottom: 0,
    height: '10vh', // Set the height to 10% of the viewport height
    backgroundColor: 'white',
    padding: '10px', // Add some padding for spacing
  },
});


const getRequestUID = async (with_userid, token) => {
  try {
    // const data = {
    //   "frm_id": frm_id,
    //   "to_id": with_userid,
    //   "message": message
    // }
    const response = await fetch(
      `http://192.168.1.9:8000/api/get_request_info_by_id/${with_userid}`,
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

const initialState = {
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    case 'RESET_MESSAGE':
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};


const ChatsEditor = ({ auth_data, with_userid }) => {
  const [callStatus, setcallStatus] = useState(null)
  const [socket, setSocket] = useState(null);
  const [my_room, setMyRoomAs] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { message } = state;

  const [dependentVariable, setDependentVariable] = useState("dependent");
  const [chat_data, setChat_data] = useState([])
  const connectSocket = () => {
    console.log(dependentVariable); // Using dependentVariable in connectSocket

    const newSocket = io.connect('http://192.168.1.9:8001', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  };

  useEffect(() => {
    const connectSocket = () => {
      const newSocket = io.connect('http://192.168.1.9:8001', {
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

  // useEffect(() => {
  //   const getRoom = async () => {
  //     const JWT_TOKEN = localStorage.getItem("token");
  //     const token = `Bearer ${JWT_TOKEN}`;
  //     const request_d = await getRequestUID(with_userid, token);
  //     setMyRoomAs(request_d.id);
  //   };

  //   getRoom();
  // }, [with_userid]);

  useEffect(() => {
    if (socket && auth_data && auth_data.id) {
      // Join the room corresponding to my_room
      console.log('AREWEHERERE', auth_data.id)
      socket.emit('join_room', { room: String(auth_data.id) });

      // Event handler for 'new_data_event'
      const handleNewDataEvent = (msg) => {
        console.log("Received data in room", auth_data.id, msg);
        setChat_data(prv => {
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
  }, [socket, auth_data]);








  const handleSubmit = () => {
    // Handle the submission of the message
    console.log("Submitted message:", message);
    makeTriggerCall(with_userid, auth_data.id, message);
    // setMessage("")
    dispatch({ type: 'RESET_MESSAGE' });
  };

  const classes = useStyles();


  const all_chats = chat_data.map(i => {
    return (
      <div style={{ marginTop: "15px", border: "1px solid red", display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            backgroundColor: "#ceebeb",
            padding: "15px 20px",
            width: "80%",
            borderBottomLeftRadius: "25%"
          }}
        >{i}</div>
      </div>
    )
  })


  const setMessage = (message) => {
    dispatch({ type: 'SET_MESSAGE', payload: message });
  }


  return (
    <WrapperChatShellWithSend title={"chats"} onSave={handleSubmit} setMessage={setMessage} message={message}>
      {all_chats}
      {callStatus == 'calling' && <PhoneCallUI
        callStatus={callStatus}
        with_userid={with_userid}
      />}
      <VideoCallIcon
        style={{ fontSize: "35px", color: "#1F4294" }}
        onClick={() => {
          console.log('got video click')
          setcallStatus("calling")

          //
        }}
      />


    </WrapperChatShellWithSend>
  );
};


const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

export default connect(mapStateToProps)(ChatsEditor);
