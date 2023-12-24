import React, { forwardRef, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AudioCallIcon from '@mui/icons-material/Call';
import ChatScreen from './ChatScreen';
import RequestScreen from '../RequestScreen';
import { ImageCircle } from '../chat_components/ImageCircle';
import NewChatScreen from './NewChatScreen';
import DetachVideoWindow from "../../screen/video_components/DetachVideoWindow";
import VideoWindow from '../video_components/VideoWindow';

const ChatScreenHeader=forwardRef(({ setvideoView, videoView, with_userid, with_email, SetWithUserId,SetWithEmail,onBackClick, user },myRef)=>{
  return (
   <>
   {/* <Button
        onClick={(e) => {
          e.preventDefault()
          // force close the connection
          // let's catch the ref
          console.log('myCurrerref', myRef.current)
          myRef.current.channel.close()

        }}
      >
        forcecloseconnection          </Button> */}
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={1}>
        <ArrowBackIcon onClick={onBackClick} style={{ cursor: 'pointer' }} />
      </Grid>
      <Grid item xs={2}>
        <ImageCircle dimention={50} user={user} />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6" color="textPrimary" align="center" noWrap>
          {user.name}
        </Typography>
        <div style={{ color: user.online ? '#00E676' : 'inherit', align: 'left', fontSize: 12 }}>
          {user.online ? 'Online' : ''}
        </div>
      </Grid>
      <Grid item xs={2}>
        <AudioCallIcon style={{ fontSize: '35px', color: '#1F4294' }} />
      </Grid>
      <Grid item xs={2}>
        <VideoCallIcon onClick={(e) => {
          e.preventDefault()
          // force close the connection
          // let's catch the ref
          console.log('myCurrerref', myRef.current)
          myRef.current.channel.close()
          // <DetachVideoWindow with_email={with_email} with_userid={with_userid} />
          // SetWithUserId

        }} style={!videoView?{ fontSize: '35px', color: '#1F4294' }:{ fontSize: '35px', color: 'black' }} />
      </Grid>
    </Grid>
   </>
  );
})

const ChatScreenWithInfoWS = forwardRef(({ videoView, setvideoView, with_userid, SetWithUserId, SetWithEmail, requestStatus, connection_open, with_email, chats, sendMsg }, myRef) => {
  // const [videoView, setvideoView] = useState(false)

  console.log('WHAT ISIT in ChatScreenWithInfoWS', connection_open)

  // useEffect(() => {
  //   if (!connection_open){

  //   }
  // }, [videoView])

  const user = {
    id: 1,
    name: 'Pulkit Ssdasdfasdfsdafsadf',
    imageUrl: 'https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1',
    online: true,
  };

  const handleBackClick = () => {
    console.log('onclose clicked');
    SetWithUserId(null)
  };

  const renderContent = () => {
    console.log('ABCDEF2')

    if (requestStatus === 'ACCEPTED' && connection_open) {
      if (videoView) {
        console.log('wasconnected!', connection_open)
        return (
          // <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
          // <DetachVideoWindow connection_open={connection_open} with_email={with_email} with_userid={with_userid} />
          <div>VIdeoVIewhere</div>
        );

      }
      else {
        return (
          // <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
          <NewChatScreen chats={chats} sendMsg={sendMsg} />
        );

      }
    } else if (requestStatus && requestStatus !== 'ACCEPTED') {
      return <RequestScreen with_email={with_email} />;
    } else if (connection_open==null) {
      return <div>Opening the connection...- Mode - {JSON.stringify(videoView)}</div>;
    }else if (videoView) {
      return <div>
        <div>we will now render the VideoWindow which should appranetly do everything make sure this is write and for opponent -{with_userid}</div>
        <VideoWindow with_email={with_email} with_userid={with_userid} />
      
      </div>;
    }     
    else if (connection_open===false) {
      return <div>It seems connection was closed from either side - {JSON.stringify(videoView)}</div>;
    }    
    else {
      return <div>Unhandled Case</div>;
    }
  };

  return (
    <>
      
      <ChatScreenHeader ref={myRef} videoView={videoView} setvideoView={setvideoView} with_userid={with_userid} with_email={with_email} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} onBackClick={handleBackClick} user={user} />

      <div>
        <div>29yrs, Lucknow</div>
        <div>Teacher</div>
      </div>
      {renderContent()}
    </>
  );
})

export default ChatScreenWithInfoWS;