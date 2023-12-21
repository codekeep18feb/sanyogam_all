import { Typography, Button, Icon } from "@mui/material";
import StarIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Call";
import WhatsApp from "@mui/icons-material/WhatsApp";
import CameraIcon from "@mui/icons-material/CameraAltRounded";
import ShareRIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";

function HomeProfileBox({
  imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
  fullname,
  current_location,
  email
}) {
  const [bstate, setBstate] = useState(null)
  const containerStyle = {
    padding: "5px 16px",
    // textAlign: "left",
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
    margin:"5px",
    height: "20px",
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const textContainerStyle = {
    paddingLeft: "20px",
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const circleStyle = { color: "green", borderRadius: "50%", padding: "2px", backgroundColor: "white" }
  const sendRequest=async ()=>{
    console.log('we should send request to the user',email)
    setBstate('sending')
    const res = await sendConnectReq(email,"SENT")
    setBstate('sent')
    console.log('herewqrewr',res)
  }

  const sendConnectReq =async(to_email_nr=null,action=null)=>{
    console.log('whasdsdtsdfer',action,to_email_nr)
    // console.log('onsave ran here we can see the ',{family_info:formValues})
    // const data = await submitProfileUpdateData({family_info:formValues})
  const JWT_TOKEN = localStorage.getItem("token");
  const token = `Bearer ${JWT_TOKEN}`;
  const response = await fetch(`http://127.0.0.1:8000/api/handle_request?to_email=${to_email_nr}&action=${action}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }
  });

  if (response.status === 200) {
    const data = await response.json();
    // nagivate(-1);

    console.log("successfully upASDFDSdate profiled", data);
    //   const arrayOfObjects = [
    //     { "key1": "value1a", "key2": "value2a" },
    //     { "key1": "value1b", "key2": "value2b" },
    //     // Add more objects as needed
    // ];
  
    // Specify the keys to merge
    // const key1ToMerge = "user_fname";
    // const key2ToMerge = "user_lname";
    
    // // Use map to create a new array with merged keys
    // const newArray = data.map(obj => ({
    //     ...obj,
    //     fullname: `${obj[key1ToMerge]} ${obj[key2ToMerge]}`,
    //     // Optionally, you can exclude the original keys if needed
    //     [key1ToMerge]: undefined,
    //     [key2ToMerge]: undefined,
    // }));
    
    // // Display the modified array of objects
    // console.log(newArray);
    // setdata(newArray)


  } else {
    console.log("Error updating profile");
  }

  }

  return (
    <div style={{ ...containerStyle, color: "white" }}>
      <div style={{ ...topRowStyle, paddingRight: "10px" }}>
        <div style={iconContainerStyle}>
          <Icon component={ShareRIcon} style={{ color: "blue", backgroundColor: "white", borderRadius: "50%" }} />
        </div>

        <div style={iconContainerStyle}>
          <Icon component={MenuIcon} style={{ color: "white", backgroundColor: "rgba(255, 0, 153, 1)", borderRadius: "50%" }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "10px 30px 0 0" }}>
        <div style={{ ...cameraCover }}>
          <Icon component={CameraIcon} style={{ color: "white" }} />
          <div style={{ color: "white", marginLeft: "3px", marginTop: "1px" }}>3</div>
        </div>
      </div>

    
      <div style={{...bottomRowStyle,marginLeft:'15px'}}>
        <div>
          <div style={{ ...textContainerStyle }}>
            {fullname} ({current_location})
          </div>
          <div style={{ ...textContainerStyle, fontSize: "12px" }}>
            <p>32 yrs. 5'5" Sonal</p>
          </div>
          <div style={{ ...textContainerStyle, paddingBottom: "10px" }}>
            Software Developer
          </div>
          <div style={actionRow}>
            <div style={{ ...flexContainerStyle, flexDirection: "column", textAlign: "center" }}>
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
        <Button variant="contained" color="primary" sx={{marginLeft:"20px",width:"100%"}} onClick={()=>sendRequest()}>
        {bstate=='sending'?"sending...":bstate=='sent'?'sent':'send request'}
      </Button>
        

      </div>
      <div style={backgroundImageStyle}></div>
    </div>
  );

}

export default HomeProfileBox;
