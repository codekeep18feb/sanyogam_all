import React, { useEffect, useRef, useState } from 'react';

function LocalVideo({ peerConnection }) {
  const localVideoRef = useRef(null);
  const [localOffer, setLocalOffer] = useState(null); // Initialize as null
  const [remoteAnswer, setRemoteAnswer] = useState(''); // State to store remote answer

  useEffect(() => {
    const startLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        // Add the local stream tracks to the RTCPeerConnection
        if (peerConnection) {
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
          peerConnection.ontrack = (event) => {
            console.log('First remote stream has arrived:', event.streams[0]);
          };
        }
      } catch (error) {
        console.error('Error accessing local media:', error);
      }
    };

    startLocalVideo();
  }, [peerConnection]);

  const generateLocalOffer = async () => {
    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    setLocalOffer(offer);
  };

  const handleRemoteAnswerSubmit = async () => {
    // Parse the remote answer and set it as the remote description
    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    const offer = localOffer; // Use the generated local offer
    const remoteAnswerDesc = JSON.parse(remoteAnswer);

    await peerConnection.setRemoteDescription(new RTCSessionDescription(remoteAnswerDesc));

    // At this point, your local and remote streams are connected.
    // You can handle the connection as needed for your use case.
  };

  return (
    <div>
      <h2>Your Local Video</h2>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <button onClick={generateLocalOffer}>Generate Local Offer</button>
      <div>
        <h3>Local Offer:</h3>
        <pre>{localOffer ? JSON.stringify(localOffer, null, 2) : 'No offer generated'}</pre>
      </div>
      <div>
        <h3>Paste Remote Answer:</h3>
        <textarea
          value={remoteAnswer}
          onChange={(e) => setRemoteAnswer(e.target.value)}
          rows={5}
        />
        <button onClick={handleRemoteAnswerSubmit}>Submit Remote Answer</button>
      </div>
    </div>
  );
}

export default LocalVideo;
