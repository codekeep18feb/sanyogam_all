import React from 'react';
import Grid from '@mui/material/Grid';
import logo192 from '../images/Vector.jpg';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  circle: {
    width: '80px',
    height: '80px',
    backgroundColor: 'white',
    border: "2px solid grey",
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
    backgroundColor: 'green',
    borderRadius: '50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileTile: {
    padding: "50px",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));

export function ImageCircle({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      {user.online && <PhotoCamera className={classes.greenDot} />}
      <img src={logo192} alt="Circle Image" width="60" height="60" />
    </div>
  );
}

export default function ProfileBriefTile({ users, profile = { name: "Mona Soni (BPSADSFSG151)" } }) {
  const classes = useStyles();

  return (
    <div className={classes.profileTile}>
      <Grid container style={{ flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
        <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <ImageCircle user={{ "online": true }} />
          </div>
          <div>
            <Typography variant="h6">{profile.name}</Typography>
          </div>
          <div>
            <Typography variant="subtitle2">Edit Profile</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Your Profile Score</Typography>
            <Typography variant="subtitle2">11%</Typography>
          </div>
          <div>
            <Typography variant="button">Update Now</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
