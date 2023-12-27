import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import NewChatScreen from './NewChatScreen';
import { CircularProgress, Grid } from '@mui/material';
import ChatsOWSTile from './ChatsOWSTile';
import SendIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { ImageCircle } from '../../chat_components/ImageCircle';
import AudioCallIcon from '@mui/icons-material/Call';
import { Typography } from '@material-ui/core';

const withSocket = (Component) => {
  // const JWT_TOKEN = localStorage.getItem("token");
  // const token = `Bearer ${JWT_TOKEN}`;

  return function WithSocketComponent({ with_userid, ...props }) {
    const [socket, setSocket] = useState(
      io.connect('http://192.168.1.13:8000', {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    const [allChats, setAllChats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchOnlineProfiles = () => {
        const room = "hardcode"
        socket.emit('fetch_profile_chats', with_userid);
      };

      fetchOnlineProfiles();

      const intervalId = setInterval(() => {
        fetchOnlineProfiles();
      }, 1000);

      socket.on('fetch_profile_chats', (data) => {
        if (data) {
          console.log('dafsfasd', data.room)
          const pdata = JSON.parse(data);
          console.log('sdfasdf', pdata)
          const f_data = pdata//.filter((i) => (i.frm_user === with_userid));

          setAllChats((prevChats) => {
            if (!prevChats) {
              setAllChats(f_data);
              setLoading(false);
            } else if (prevChats && f_data.length !== prevChats.length) {
              setAllChats(f_data);
              setLoading(false);
            }
            return prevChats;
          });
        }
      });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      return () => {
        clearInterval(intervalId);
        socket.disconnect();
      };
    }, [socket, with_userid]);

    return <Component allChats={allChats} loading={loading} {...props} with_userid={with_userid} />;
  };
};

const ChatScreenHeader=({ setVideoMode, videoMode, with_userid, with_email, SetWithUserId,SetWithEmail,onBackClick, 
  user })=>{
  return (
   <>
 
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
        <VideoCallIcon 
        
        disabled={!videoMode}
        onClick={(e) => {
          console.log('arerewqrwer')
          e.preventDefault()
          setVideoMode(true)
          // force close the connection
          // let's catch the ref
          // console.log('myCurrerref', myRef.current)
          // myRef.current.channel.close()
          // <DetachVideoWindow with_email={with_email} with_userid={with_userid} />
          // SetWithUserId
          

        }} style={!videoMode?{ fontSize: '35px', color: '#1F4294' }:{ fontSize: '35px', color: 'black' }} />
      </Grid>
    </Grid>
   </>
  );
}


function VideoComp({with_userid}) {
  // const [signal_pool, setsignal_pool] = useState(true)
  const yourVideoRef = useRef(null);
  const myRef = useRef(null);

  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  const [signal_pool, setSignalPool] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRtcInfo = () => {
      // socket.emit('signal_pool', '{"offer":"myoffer","action":"ADD"}',with_userid);
    };

    fetchRtcInfo();

    const intervalId = setInterval(() => {
      fetchRtcInfo();
    }, 1000);

    socket.on('signal_pool', (data) => {
      if (data) {
        console.log('dafsuyiiuytfasd',data)
        // const pdata = JSON.parse(data);
        // console.log('sdfasdf',pdata)
        // const f_data = pdata //.filter((i) => (i.frm_user === with_userid));

        // setAllChats((prevChats) => {
        //   if (!prevChats) {
        //     setAllChats(f_data);
        //     setLoading(false);
        //   } else if (prevChats && f_data.length !== prevChats.length) {
        //     setAllChats(f_data);
        //     setLoading(false);
        //   }
        //   return prevChats;
        // });
      }
    });

    socket.on('connect', () => {
      console.log('Socket_pool connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket_pool disconnected');
    });

    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [socket, with_userid]);

  const initializeWebRTC = async (token, type) => {
    if (type == "INITIATOR") {
      console.log("Ensure it's not called multiple times...");

      const lc = new RTCPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("doweseestream", stream);
      yourVideoRef.current.srcObject = stream;
      // myRef.current = {"srcObject":stream};
      // setStream(stream);
      lc.addStream(stream);
      lc.onaddstream = (event) => {
        console.log("ON LOCAL @ TRACK", event, event.stream, myRef.current);
        // myRef.current = {"srcObject":event.stream};
        // remoteVideoRef.current.srcObject = event.stream;
        yourVideoRef.current.srcObject = event.stream;

        // setStream(event.stream)
        // setRemoteStream(event.stream);
      };
      // lc.onaddstream = (event) => {
      //   myRef.current = {"srcObject":event.stream};
      //   // remoteVideoRef.current.srcObject = event.stream;
      //   setStream(event.stream)
      //   // setRemoteStream(event.stream);
      // };

      lc.onicecandidate = async (e) => {
        if (e.candidate) {
          // Candidate is available, but don't save it yet
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
          // ICE gathering is complete, save the final ICE candidate to the database
          console.log("ICE gathering is complete");
          // const to_user_id = await fetchUserId(token, with_email);
          // console.log(
          //   "Final ICE candidate:",
          //   JSON.stringify(lc.localDescription)
          // );
          // addRTCUserInfo(true, JSON.stringify(lc.localDescription), to_user_id);
        }
      };

      lc.createOffer()
        .then((o) => lc.setLocalDescription(o))
        .then((a) => {
          console.log("offer set successfully!");
          console.log(
            "Signaling State after setting local description:",
            lc.signalingState
          );
        });
      return [lc];
    } 
  };

  useEffect(async() => {
    if (signal_pool.length==0){
      console.log('wevewrqwe here')
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;
      const [lc] = await initializeWebRTC(token, "INITIATOR");
      // console.log("dowehave dc",dc)
      
      if (lc) {
        console.log(lc, "sdfsdf lc");
        // myRef.current = {
        //   type: "INITIATOR",
        //   channel: lc,
          // "lc":lc
        // };

        // myRef.current = 'updated Value';
      }

    }
  }, [signal_pool])
  
  
  return (
    <div>

      <video
        ref={yourVideoRef} // Add a ref to the video element
        autoPlay
        playsInline
        muted // You may want to remove this if it's not the local video
        // Add other attributes such as width, height, etc.
      ></video>
    </div>
  )
}

function ChatsEditor({ allChats, loading, with_email, with_userid,SetWithUserId,SetWithEmail }) {
  console.log('sdfasdfsadf', with_userid)
  const [videoMode, setVideoMode] = useState(false)


  console.log('this shoudl not rerender if other twos are toaking',videoMode)

  return (
    <div
    >
      <ChatScreenHeader
        // ref={myRef} 
        setVideoMode={setVideoMode}
        videoMode={videoMode}
        // setVideoMode={setVideoMode} 
        // with_userid={with_userid} 
        // with_email={with_email} 
        // SetWithUserId={SetWithUserId} 
        // SetWithEmail={SetWithEmail}
        onBackClick={() => {
          SetWithUserId(null)
          SetWithEmail(null)
        }}
        user={{
          "online": true, imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
          // ,"name":'deepak si'
        }}
      />
      {loading && <CircularProgress />}
      {!loading && videoMode && (
        <VideoComp with_userid={with_userid}/>
      )}
      {!loading && allChats && !videoMode && (
        <NewChatScreen chats={allChats} to_email={with_email} />
      )}

    </div>
  );
}

export default withSocket(ChatsEditor);
// export default withSocket;
