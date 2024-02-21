import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@mui/material';
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Call";
import WhatsApp from "@mui/icons-material/WhatsApp";
import HorizontalScroll from '../../must/homeroute/HorizontalScroll';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function AllMatchesScrollBarC() {
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
  const classes = useStyles();
  return (
    <HorizontalScroll >
      <div className={classes.scrollItem}>

        <div style={{ display: 'flex' }}>
          <div>
            <img src={"https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"} />
          </div>
          <div style={{ padding: "0 10px" }}>
            Pulkit Soni (Noida)
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
              <li style={{ marginRight: '10px' }}>
                32 Yrs
              </li>
              <li style={{ marginRight: '10px' }}>
                57
              </li>
              <li>
                Hindu
              </li>
            </ul>
            <div>
              <Typography variant="h6">Software Developer</Typography>
              <div style={{ display: 'flex' }}>
                <ChatIcon style={{ fontSize: '24px', color: 'skyblue' }} />
                <PhotoCamera style={{ fontSize: '24px', color: 'skyblue' }} />
                <WhatsApp style={{ fontSize: '24px', color: 'skyblue' }} />


              </div>
            </div>
          </div>


        </div>

      </div>
      <div style={{ border: "1px solid red" }}>Content 2</div>
      <div className={classes.scrollItem}>Content 3</div>
    </HorizontalScroll>

  )
}
