import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AudioCallIcon from "@mui/icons-material/Call";


import ChatWindow from "./chat_components/ChatWindow";
import { ImageCircle } from "./chat_components/ImageCircle";
import { Grid } from "@mui/material";
import { Typography } from "@material-ui/core";
import RequestScreen from "./RequestScreen";
import NewChatScreen from "./chat_components/NewChatScreen";

const ChatModal = ({ SetWithUserId, with_userid, with_email }) => {
  console.log('DODFSDF',SetWithUserId)
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "white",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <div>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid item xs={1} alignItems={"flex-start"}><ArrowBackIcon onClick={() => {
            console.log('onclose clicked')
            SetWithUserId(null)
          }} style={{ cursor: "pointer" }} /></Grid>
          <Grid item xs={2}>
            <ImageCircle dimention={50} user={{ id: 1, imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1" }} />

          </Grid>
          <Grid item xs={3} >

            <Typography variant="h6" color="textPrimary" align="center" noWrap>
              Pulkit Ssdasdfasdfsdafsadf#00E676
            </Typography>
            <div style={{ color: "#00E676", align: "left", fontSize: 12 }}>
              Online
            </div>
          </Grid>
          <Grid item xs={2}><AudioCallIcon style={{ fontSize: "35px", color: "#1F4294" }} /></Grid>
          <Grid item xs={2} ><VideoCallIcon style={{ fontSize: "35px", color: "#1F4294" }} /></Grid>
        </Grid>
      </div>
      <div>
        <div>29yrs, Lucknow</div>
        <div>Teacher</div>
      </div>

      <RequestScreen with_email={with_email} />
      





      {/* <div>{with_userid} - {with_email}</div> */}
      <NewChatScreen with_email={with_email} chats={null} sendMsg={(text)=>{
        console.log('sendmsg was called',text)
      }} />

    </div>
  );
};

export default ChatModal;
