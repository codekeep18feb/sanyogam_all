import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@mui/material';
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Call";
import WhatsApp from "@mui/icons-material/WhatsApp";
import HorizontalScroll from '../component/reusables/HorizontalScroll';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
export default function InboxFilterScrollBarC() {
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
      // width: '300px',
      marginRight: '10px',
      borderRadius:"10px",
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
        {/* <ManageSearchIcon className={classes.scrollItem} /> */}
        <div className={classes.scrollItem}>Intrests Received</div>
        <div className={classes.scrollItem}>Accepted</div>
        <div className={classes.scrollItem}>Intrests Send</div>
        <div className={classes.scrollItem}>Intrests Declined</div>
      </HorizontalScroll>

  )
}
