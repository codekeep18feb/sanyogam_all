import React, { useState } from 'react'
import HorizontalScroll from '../component/reusables/HorizontalScroll'
import { makeStyles } from '@material-ui/core/styles';
import ProfileBriefTile from './ProfileBriefTile';
import ProgressBar from '../component/reusables/ProgressBar';
import { Button, Grid, TextField } from '@mui/material';
import { ImageCircle } from './chat_components/ImageCircle';
import MatchesFilterScrollBarOnChatC from './MatchesFilterScrollBarOnChatC';
import MyWSComponent from "../../src/screen/chat_components/MyWSComponent"
import MonitorWSStatus from '../component/MonitorWSStatus';
import ListnerWS1 from '../component/ListnerWS1';

import SendMsgWS from '../component/SendMsgWS';
import RoomFeature from './RoomFeature';

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


const MyComponent = () => {
  const [userData, setUserData] = useState({ name: 'John', age: 25, hobbies: ['Reading', 'Gaming'] });

  const updateHobbies = () => {
    // Check if the 'hobbies' property exists in the current state
    if ('hobbies' in userData) {
      // Using the functional form of setState to conditionally update the state
      setUserData(prevUserData => {
        // Creating a new object with the same properties as the previous state
        // Updating the 'hobbies' property only if it exists
        return { ...prevUserData, hobbies: [...prevUserData.hobbies, 'Traveling'] };
      });
    }
  };

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Age: {userData.age}</p>
      <p>Hobbies: {userData.hobbies.join(', ')}</p>
      <button onClick={updateHobbies}>Add Hobby</button>
    </div>
  );
};


export default function PlayGround() {
  const classes = useStyles();

  return (
    <div>
    {/* <MonitorWSStatus /> */}
    {/* <SendMsgWS />
    <ListnerWS1 /> */}
  {/* <RoomFeature /> */}
    <MyComponent />
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
