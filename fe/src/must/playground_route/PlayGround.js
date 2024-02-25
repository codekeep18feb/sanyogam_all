import { Grid, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowLeft";
// import ArrowNextIcon from "@mui/icons-material/ArrowRight";
import ArrowNextIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsApp from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Phone";
import ShareRIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhotoCamera from "@mui/icons-material/PhotoCamera";


export function ProfileImageComp({data}) {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(https://images.pexels.com/photos/596887/pexels-photo-596887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        backgroundSize: "cover", // or 'contain' based on your preference
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        // border:"5px solid red",

        width: "90vw",
        height: "90vh",
        borderRadius: "10px",
        boxSizing: "border-box",
        margin:"0 auto"
      }}
    >
      <div style={{ position: "absolute", top: 30, right: 30, padding: "20px" }}>
        <div style={{ marginTop: "10px", color: "white" }}>
          {/* <div>Chati</div>
        <div>Calli</div> */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            spacing={3}
            flexDirection={"column"}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-around"
              spacing={3}
              flexDirection={"row"}
            >
              <Grid item xs={1}>
                <ShareRIcon
                  // onClick={onBack}
                  style={{
                    cursor: "pointer",
                    padding: 10,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "blue",
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <MoreHorizIcon
                  // onClick={onBack}
                  style={{
                    cursor: "pointer",
                    padding: 10,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    color: "white",
                  }}
                />
              </Grid>
            </Grid>

            <div style={{
              display:"flex",
              padding: "5px 10px",
              borderRadius: "40%",
              backgroundColor: "red",
              color: "white",
              marginTop:10
            }}>
            <PhotoCamera
                  // onClick={onBack}
                  style={{
                    cursor: "pointer",
                    
                  }}
                />
            <div style={{paddingLeft:5}}>3</div>
            </div>
          </Grid>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "45%",
          left: 0,
          backgroundColor: "rgba(121, 150, 195, 1)",
          borderTopRightRadius: "40%",
          borderBottomRightRadius: "40%",
        }}
      >
        <ArrowNextIcon
          // onClick={onBack}
          // fontSize={"30px"}
          style={{
            cursor: "pointer",
            color: "#c3bcaf",
            fontSize: 40,
            transform: "rotate(180deg)",
            padding: "15px 5px 15px 1px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "45%",
          right: 0,
          backgroundColor: "rgba(121, 150, 195, 1)",
          borderTopLeftRadius: "40%",
          borderBottomLeftRadius: "40%",
        }}
      >
        <ArrowNextIcon
          // onClick={onBack}
          // fontSize={"30px"}
          style={{
            cursor: "pointer",
            color: "#c3bcaf",
            fontSize: "40px",
            padding: "15px 5px 15px 1px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          padding: "20px",
          color: "white",
        }}
      >
        <div>
          <Typography variant="subtitle2" fontSize={20}>
          {data.name} ({data.location})
          </Typography>
          <Typography variant="subtitle2" fontSize={16}>
            {data.age} yrs, {data.height}, {data.religion}
          </Typography>
          <Typography variant="subtitle2" fontSize={16}>
            {data.occupation}
          </Typography>
        </div>
        <div style={{ marginTop: "50px" }}>
          {/* <div>Chati</div>
        <div>Calli</div> */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={1}>
              <WhatsApp
                // onClick={onBack}
                // fontSize={"50px"}
                style={{
                  cursor: "pointer",
                  fontSize: 40,
                  padding: 10,
                  borderRadius: "100%",
                  backgroundColor: "white",
                  color: "green",
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <CallIcon
                // onClick={onBack}
                style={{
                  cursor: "pointer",
                  fontSize: 40,
                  padding: 10,
                  borderRadius: "100%",
                  backgroundColor: "white",
                  color: "blue",
                }}
              />
            </Grid>

            <Grid item xs={1}>
              <ChatIcon
                // onClick={onBack}
                style={{
                  cursor: "pointer",
                  fontSize: 40,
                  padding: 10,
                  borderRadius: "100%",
                  backgroundColor: "white",
                  color: "red",
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default function PlayGround() {
  return(<ProfileImageComp 
    data={
      {name:"pulkot soni",
      location:"noida",
      age:"32",
      height:"5'7",
      religion:"Hindu",
      occupation:"Software Develop"}
    }
    
    
    />)
}
