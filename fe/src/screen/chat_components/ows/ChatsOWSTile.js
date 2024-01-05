import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ImageCircle } from './ImageCircle';
import { Icon } from "@mui/material";
import callIcon from "@mui/icons-material/Phone";
import NewChatScreen from './NewChatScreen';

export default function ChatsOWSTile({ chats }) {
  //here will make the call for user online status
  const sendMsg=(msg)=>{
    console.log('here is msg we should send to the user',msg)
    console.log('probably wanna make an entry??')
  }
  return (
    <div style={{border:"1px solid red"}}>
      <NewChatScreen chats={chats} sendMsg={sendMsg} />

      
    </div>
  )
}
