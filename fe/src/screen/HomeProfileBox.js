import { Typography, Icon } from "@mui/material";
import StarIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Call";
import WhatsApp from "@mui/icons-material/WhatsApp";
import CameraIcon from "@mui/icons-material/CameraAltRounded";
import ShareRIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/MoreHoriz";
import React from "react";

function HomeProfileBox({
  imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
}) {
  const containerStyle = {
    padding: "5px 16px",
    textAlign: "left",
    // padding: "5px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    height: "450px",
    width: "325px",
    borderRadius: "5px",
    overflow: "hidden", // Hide overflow
    margin: "0 auto"
  };

  const backgroundImageStyle = {
    content: "''",
    position: "absolute",
    top: "5%",
    // left: "0",
    width: "90%",
    // margin:"0 auto",
    height: "100%", // Set the pseudo-element's height to 80%
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    zIndex: "-1",
  };
  const cameraCover = {
    display: "flex", background: "rgba(255, 0, 153, 1)", borderRadius: "10px", padding: "0 7px 0 5px", justifyContent: "center"
  }
  const iconText = {
    // color:"white"
    paddingTop: "10px"
  }
  const topRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "10%",
    // marginRight:"10%"
    // color:"black"
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
    "line-height": 8 /* You can adjust this value as needed */

  };

  const actionRow = {
    display: "flex",
    justifyContent: "space-between",
    // width: "50%",
    marginLeft: "20px",
    // border: "1px solid red"
    // position: "absolute",
    // bottom: "5px",
    // left: "5px",
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
    paddingLeft: "5px",
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const circleStyle = { color: "green", borderRadius: "50%", padding: "2px", backgroundColor: "white" }

  return (
    <div style={{ ...containerStyle, color: "white" }}>
      <div style={topRowStyle}>
        <div style={iconContainerStyle}>
          <Icon component={ShareRIcon} style={{ color: "blue", backgroundColor: "white", borderRadius: "50%" }} />
        </div>

        <div style={iconContainerStyle}>
          <Icon component={MenuIcon} style={{ color: "white", backgroundColor: "rgba(255, 0, 153, 1)", borderRadius: "50%" }} />
        </div>
      </div>
      <div style={{ ...cameraCover }}>
        <Icon component={CameraIcon} style={{ color: "white" }} />
        <div style={{ color: "white", marginLeft: "3px", marginTop: "1px" }}>3</div>
      </div>

      <div style={bottomRowStyle}>
        <div style={{ margin: "10px" }}>
          <div style={{ ...textContainerStyle }}>
            Pulkit Soni (Noida)
          </div>
          <div style={{ ...textContainerStyle, fontSize: "12px" }}>
            <p>32 yrs. 5'5" Sonal</p>
          </div>
          <div style={{ ...textContainerStyle, paddingBottom: "10px" }}>
            Software Developer
          </div>
        </div>

        <div style={actionRow}>
          <div style={{ ...flexContainerStyle, flexDirection: "column", textAlign: "center"}}>
            <StarIcon style={{ ...circleStyle }} />
            <div style={{ ...iconText }}>Chat</div>
          </div>
          <div style={{ ...flexContainerStyle, flexDirection: "column", marginLeft: "30px", marginRight: "30px", textAlign: "center" }}>
            <FavoriteIcon style={{ ...circleStyle }} />
            <div style={{ ...iconText }}>Call</div>
          </div>
          <div style={{ ...flexContainerStyle, flexDirection: "column", textAlign: "center", paddingBottom: "10px" }}>
            <WhatsApp style={{ ...circleStyle }} />

            <div style={{ ...iconText }}>WhatsApp</div>
          </div>
        </div>
      </div>
      <div style={backgroundImageStyle}></div>
    </div>
  );

}

export default HomeProfileBox;
