import React, { useEffect, useState } from "react";
import HeaderDesktop from "../homeroute/HeaderDesktop";
import Footer from "../back_tile_route/Footer";
import HeaderMobile from "../homeroute/HeaderMobile";
import BottomMobile from "../back_tile_route/BottomMobile";
import bgImg from "../../images/sky_bg.jpg";
import HeaderMobileBack from "../back_tile_route/HeaderMobileBack";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ImageCircle } from "./ImageCircle";
import AudioCallIcon from "@mui/icons-material/Call";



const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= 468) {
    return "desktop";
  } else {
    return "mobile";
  }
};

const ChatScreenHeader = ({
  // setVideoMode,
  // videoMode,
  onClick,
  onBack,
  user,
}) => {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={1}>
          <ArrowBackIcon
            onClick={onBack}
            style={{ cursor: "pointer" }} />
        </Grid>
        <Grid item xs={2}>
          <ImageCircle dimention={50} user={user} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="textPrimary" align="center" noWrap>
            {user.name}
          </Typography>
          <div
            style={{
              color: user.online ? "#00E676" : "inherit",
              align: "left",
              fontSize: 12,
            }}
          >
            {user.online ? "Online" : ""}
          </div>
        </Grid>
        <Grid item xs={2}>
          <AudioCallIcon style={{ fontSize: "35px", color: "#1F4294" }} />
        </Grid>
        <Grid item xs={2}>
          <VideoCallIcon
            // disabled={!videoMode}
            onClick={onClick}
          // style={
          //   !videoMode
          //     ? { fontSize: "35px", color: "#1F4294" }
          //     : { fontSize: "35px", color: "black" }
          // }
          />
        </Grid>
      </Grid>
    </>
  );
};


export default function WrapperChatShellWithSend({
  children,
  title,
  onSave,
  setMessage,
  message,
  onBack,
  onClick
}) {
  console.log("title", title);

  const [deviceType, setDeviceType] = useState(getDeviceType());

  console.log("deviceType", deviceType);
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    // <Paper>
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <ChatScreenHeader
        // ref={myRef}
        // setVideoMode={setVideoMode}
        // videoMode={videoMode}
        // setVideoMode={setVideoMode}
        // with_userid={with_userid}
        // with_email={with_email}
        // SetWithUserId={SetWithUserId}
        // SetWithEmail={SetWithEmail}
        // onBackClick={() => {
        //   SetWithUserId(null);
        //   SetWithEmail(null);
        // }}
        onClick={onClick}
        onBack={onBack}
        user={{
          online: true,
          imageUrl:
            "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1",
          // ,"name":'deepak si'
        }}
      />

      <div
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.3)",
          textAlign: "center",
        }}
      >

        {/* {deviceType==='mobile'?<HeaderMobile />:<HeaderDesktop />} */}
        {/* <HeaderMobileBack title={title} /> */}
      </div>

      {/* Middle Content (Scrollable) */}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          border: "1px solid blue",
          // ,backgroundImage: `url(${bgImg})`,
          // backgroundSize: 'cover', // or 'contain' based on your preference
          // backgroundRepeat: 'no-repeat',
          // backgroundPosition: 'center center'
        }}
      >
        {/* <img src={bgImg} width={"10px"} height={"10px"}/> */}
        {children}
      </div>

      {/* Bottom Header */}
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        style={{
          borderRadius: 0,
          backgroundColor: "rgba(255,0,153,1)",
          color: "white",
        }}
        onClick={() => onSave()}
      >
        Save1
      </Button>
    </div>
    // </Paper>

  );
}
