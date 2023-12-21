import React from 'react';
import { Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AudioCallIcon from '@mui/icons-material/Call';
import ChatScreen from './ChatScreen';
import RequestScreen from '../RequestScreen';
import { ImageCircle } from '../chat_components/ImageCircle';
import NewChatScreen from './NewChatScreen';

function ChatScreenHeader({ onBackClick, user }) {
  return (
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
        <VideoCallIcon style={{ fontSize: '35px', color: '#1F4294' }} />
      </Grid>
    </Grid>
  );
}

export default function ChatScreenWithInfo({ requestStatus, connection_open, with_email, chats, sendMsg }) {
  const user = {
    id: 1,
    name: 'Pulkit Ssdasdfasdfsdafsadf',
    imageUrl: 'https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1',
    online: true,
  };

  const handleBackClick = () => {
    console.log('onclose clicked');
    // SetWithUserId(null)
  };

  const renderContent = () => {
    if (requestStatus === 'ACCEPTED' && connection_open) {
      return (
      // <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
      <NewChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
      );
    } else if (requestStatus && requestStatus !== 'ACCEPTED') {
      return <RequestScreen with_email={with_email} />;
    } else if (!connection_open) {
      return <div>Opening the connection...</div>;
    } else {
      return <div>Unhandled Case</div>;
    }
  };

  return (
    <>
      <ChatScreenHeader onBackClick={handleBackClick} user={user} />

      <div>
        <div>29yrs, Lucknow</div>
        <div>Teacher</div>
      </div>
      {renderContent()}
    </>
  );
}
