import React, { useRef, useState, useEffect } from 'react';

function RemoteVideo({ peerConnection }) {
  const remoteVideoRef = useRef(null);
  const [remoteOffer, setRemoteOffer] = useState('');
  const [remoteAnswer, setRemoteAnswer] = useState('');

  useEffect(() => {
    const startRemoteVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteVideoRef.current.srcObject = stream;

        // Add the remote stream tracks to the RTCPeerConnection
        if (peerConnection) {
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
          peerConnection.ontrack = (event) => {
            console.log('First local stream has arrived', event.streams[0]);
          };
        }
      } catch (error) {
        console.error('Error accessing remote media:', error);
      }
    };

    startRemoteVideo();
  }, [peerConnection]);

  const generateRemoteAnswer = async () => {
    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    const pc = peerConnection;

    const remoteOfferDesc = JSON.parse(remoteOffer);
    await pc.setRemoteDescription(new RTCSessionDescription(remoteOfferDesc));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    setRemoteAnswer(JSON.stringify(answer, null, 2));
  };

  return (
    <div>
      <h2>Remote Peer's Video</h2>
      <video ref={remoteVideoRef} autoPlay playsInline />
      <div>
        <h3>Remote Offer:</h3>
        <textarea
          value={remoteOffer}
          onChange={(e) => setRemoteOffer(e.target.value)}
          rows={5}
        />
        <button onClick={generateRemoteAnswer}>Generate Remote Answer</button>
      </div>
      <div>
        <h3>Remote Answer:</h3>
        <pre>{remoteAnswer || 'No answer generated'}</pre>
      </div>
    </div>
  );
}

export default RemoteVideo;
