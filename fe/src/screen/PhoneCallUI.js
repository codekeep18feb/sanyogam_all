import React, { useEffect, useRef } from 'react';
import CallEnd from '@mui/icons-material/CallEnd';
import PickUPIcon from '@mui/icons-material/CallEnd';
import VolumeMute from '@mui/icons-material/VolumeMute';

export default function PhoneCallUI({callStatus, pickUpTheCall}) {
  // const audioRef = useRef(null);
  // console.log('what is it',callStatus)
  // const playAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play()
  //       .then(() => console.log('Audio playback started'))
  //       .catch(error => console.error('Error playing audio:', error));
  //   }
  // };
  // useEffect(() => {
  //   if (callStatus === 'RINGING') {
  //     console.log("is ringing..");
  //     playAudio()
  //     // You can still perform other actions related to the ringing status here
  //   }

  // }, [callStatus])

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    border:"1px solid green",
    

  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
    backgroundImage: 'url("https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const controlsStyle = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    width: '80%',
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const buttonStyle = {
    padding: '20px',
    fontSize: '26px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    border:"1px solid red",
    borderRadius:"100%",
    margin:"10px"
  };


  

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}>
      {/* <button style={buttonStyle}>
        

      </button> */}
      <div>callStatus - {callStatus.status}</div>
      <div style={controlsStyle}>
      <PickUPIcon 
      style={buttonStyle}
      onClick={()=>{
        pickUpTheCall()
      }}
        />

        {/* <button style={buttonStyle}>Mute</button> */}
        <CallEnd style={buttonStyle}/>
        {/* <button style={buttonStyle}>Turn Off Video</button> */}

        <VolumeMute style={buttonStyle}/> 
      </div>
      </div>
      {/* <div style={controlsStyle}>
        <button style={buttonStyle}>Disconnect</button>
        <button style={buttonStyle}>Mute</button>
        <button style={buttonStyle}>Turn Off Video</button>
      </div> */}
    </div>
  );
}
