import React from 'react'
import HorizontalScroll from '../component/reusables/HorizontalScroll'
import { makeStyles } from '@material-ui/core/styles';
import ProfileBriefTile from './ProfileBriefTile';
import ProgressBar from '../component/reusables/ProgressBar';
import { Button, Grid, TextField } from '@mui/material';
import { ImageCircle } from './chat_components/ImageCircle';
import MatchesFilterScrollBarOnChatC from './MatchesFilterScrollBarOnChatC';
import MyWSComponent from "../../src/screen/chat_components/MyWSComponent"
import MonitorWSStatus from '../component/MonitorWSStatus';
import ListnerWS2 from '../component/ListnerWS2';

import SendMsgWS from '../component/SendMsgWS';

const useStyles = makeStyles({
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
    height: "100px",
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
});

function ChatTestLayout() {

  return (
    <div>
      <Grid container style={{textAlign:"center"}} spacing={1}>
        <Grid item xs={6} >
          <div style={{ borderRadius: 0, backgroundColor: "#FF0099",color:"white",padding:"20px 0 20px 0" }}>Recent</div> 
        </Grid>
        <Grid item xs={6}>
          <div style={{ borderRadius: 0, backgroundColor: "white", color: "#FF0099",padding:"20px 0 20px 0" }}>Active</div> 
        </Grid>
        </Grid>

      
    <div>My Matches</div>
      <MatchesFilterScrollBarOnChatC />
      </div>
     

  )
}

export default function PlayGround2() {
  const classes = useStyles();

  return (
    <div>
    {/* <MonitorWSStatus /> */}
    <ListnerWS2 />
    <SendMsgWS />



    </div>
    // <ImageCircle user={{id:1,online:true}} />

    // <HorizontalScroll >
    //   <div className={classes.scrollItem}>Content 1</div>
    //   <div className={classes.scrollItem}>Content 2</div>
    //   <div className={classes.scrollItem}>Content 3</div>
    // </HorizontalScroll>

    // <ProfileBriefTile />
    // <TextField
    //       id="brother-number"
    //       label="No Of Brothers"
    //       type="number"
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //       variant="standard"
    //     />
  )
}
