import { Typography, Icon } from "@mui/material";
import StarIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Call";
import WhatsApp from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CameraIcon from "@mui/icons-material/CameraAltRounded";
import ShareRIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/MoreHoriz";
import React from "react";

function InboxProfileBox({
  imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
}) {
  const containerStyle = {
    display:"flex",
    margin: "5px 5px",
    textAlign: "left",
    backgroundColor: "whitesmoke",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    height: "300px",
    width: "225px",
    borderRadius: "10px",
  };

  const cameraCover = {
    display: "flex",
    background: "rgba(255, 0, 153, 1)",
    borderRadius: "10px",
    padding: "0 7px 0 5px",
    justifyContent: "center",
  };
  const iconText = {
    color: "white",
  };
  const topRowStyle = {
    display: "flex",
    // justifyContent: "space-between",
    width: "100%",
    // position: "absolute",
    // top: "5px",
    // right: "5px",
  };

  const bottomRowStyle = {
    // display: "flex",
    // justifyContent: "space-between",
    // width: "50%",
    position: "absolute",
    bottom: "10px",
    left: "5px",
    "line-height": 8 /* You can adjust this value as needed */,
  };

  const actionRow = {
    display: "flex",
    justifyContent: "space-between",
   
  };

  const iconContainerStyle = {
    backgroundColor: "rgba(255, 0, 153, 1)",
    borderRadius: "50%",
    padding: "2px",
    height: "20px",
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const textContainerStyle = {
    color: "white",
    // padding: "5px",
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    padding: "10px 50px",
    borderRadius: "50px",
  };

  return (
    <div style={{...containerStyle,border:"1px green solid"}}>
      <div style={bottomRowStyle}>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ ...textContainerStyle }}>Pulkinboxit Soni (Noida)</div>
          <div style={{ ...textContainerStyle, fontSize: "12px" }}>
            <p>32 yrs. 5'5" Sonal</p>
          </div>
          <div style={{ ...textContainerStyle, paddingBottom: "10px" }}>
            Software Developer
          </div>
        </div>

        <div style={{ ...actionRow }}>
          {/* <div>cross</div> */}
          {/* <div > */}
          <CloseIcon
            style={{
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "black",
              border: "2px solid white",
            }}
          />
          {/* </div> */}
          <button style={{ ...buttonStyle }}>Accept</button>
          {/* <div style={{ ...flexContainerStyle, flexDirection: "column",textAlign: "center",paddingBottom:"10px" }}>
        <div style={{ borderRadius: "50%", padding: "2px", backgroundColor: "white", color: "red",height:"50px",width:"50px" }} > 
        <WhatsApp style={{ color: "green", borderRadius: "50%", padding: "2px", backgroundColor: "white" }} />
        </div>
          <div style={{...iconText}}>WhatsApp</div>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default InboxProfileBox;
