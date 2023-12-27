import React, { useRef, useEffect } from 'react';
import sampleMp3 from './sample.mp3'; // Adjust the path accordingly

const PhoneCallUI = ({ callStatus }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log('Audio playback started'))
        .catch(error => console.error('Error playing audio:', error));
    }
  };

  // useEffect(() => {
  //   // Play the audio when the component is mounted
  //   playAudio();
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (callStatus === 'RINGING') {
      console.log("is ringing..");
      // You can still perform other actions related to the ringing status here
    }
  }, [callStatus]);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Audio element to play the MP3 recording */}
      <audio ref={audioRef}>
        <source src={sampleMp3} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Play button */}
      <div onClick={playAudio}>audio interface</div>
    </div>
  );
};

export default PhoneCallUI;
