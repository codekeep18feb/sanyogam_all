import React from 'react';
import Grid from '@mui/material/Grid';
import logo192 from '../../images/Vector.jpg';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import AllMatchesScrollBarC from './AllMatchesScrollBarC';
// import CameraIcon from "@mui/icons-material/CameraAltRounded";
// import ShareRIcon from "@mui/icons-material/Share";
// import MenuIcon from "@mui/icons-material/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    overflow: 'hidden',
    width: '100%',
    touchAction: 'pan-y',
  },
  innerContainer: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  scrollItem: {
    flexShrink: 0,
    // height: "100px",
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
  circle: {
    width: '80px',
    height: '80px',
    backgroundColor: 'white',
    // border: "2px solid grey",
    boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
    position: 'relative',
    padding: "20px",
  },
  greenDot: {
    width: '20px',
    height: '20px',
    backgroundColor: "white",
    boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: '50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: "5px",

  },
  profileTile: {
    paddingTop: "20px",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },


  memberShipTile: {
    paddingTop: "20px",
    margin: "20px",
    borderRadius: "10px",
    background: 'linear-gradient(135deg, #9796F0 0%, #FBC7D4 100%)',
    color: "white"

  }
}));

const iconText = {
  color: "black"
}

const flexContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const actionRow = {
  display: "flex",
  justifyContent: "space-between",
  width: "50%",
  // position: "absolute",
  // bottom: "5px",
  // left: "5px",
};

export function ImageCircle({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      {user.online && <PhotoCamera className={classes.greenDot} style={{ fontSize: '24px', color: 'skyblue' }} />}
      <img src={logo192} alt="Circle Image" width="60" height="60" />
    </div>
  );
}

export default function Home({ users, profile = { name: "Mona Soni (BPSADSFSG151)" } }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.profileTile}>
        <Grid container style={{ flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
          <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
              <ImageCircle user={{ "online": true }} />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <Typography variant="h6">{profile.name}</Typography>
            </div>
            <div style={{ marginTop: "10px", opacity: 0.8 }}>
              <a href="back_tile" style={{ textDecoration: "none" }}>
                <Typography variant="subtitle2">Edit Profile</Typography>
              </a>
            </div>

          </Grid>
        </Grid>

        <div style={{ paddingTop: "20px", width: "90%", margin: "0 auto" }}>

          <ProgressBar totalWorkDone={[0.5, 0.2, 0.3, 0.8, 1]} />
        </div>

        <div style={{ textAlign: "right", padding: "15px", color: "blue" }}>
          <Typography variant="button">Update Now</Typography>
        </div>
      </div>

      <div className={classes.memberShipTile}>
        <Grid container style={{ flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
          <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
              <Typography variant="h6">Talk To Your matches</Typography>
              <Typography variant="h6">at 60% off</Typography>
            </div>
            <div style={{ paddingTop: "10px" }}>
              <Typography variant="h6">basic plat at ₹ 499 was ₹831</Typography>
            </div>
            <div style={{ marginTop: "10px", opacity: 0.8 }}>



              <Typography variant="h6">View Contact No</Typography>
              <Typography variant="h6">Chat With Your Matches</Typography>
              <Typography variant="h6">Whatsapp your Matches</Typography>

            </div>
            <div style={{ padding: "20px" }}>
              <Button variant="contained" color="secondary" >
                Go Premium
              </Button>
            </div>
          </Grid>
        </Grid>




      </div>

      <div style={{ padding: "40px 0" }}>
        <AllMatchesScrollBarC />

      </div>
    </div>
  );
}
