import React, { useState, useEffect, useRef, useMemo } from 'react';

function LocalVideo({ peerConnection }) {
  const localVideoRef = useRef(null);
  const [localOffer, setLocalOffer] = useState(null);
  const [remoteAnswer, setRemoteAnswer] = useState('');

  console.log('IS IT RE-RENDERING');

  useEffect(() => {
    const startLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        if (peerConnection) {
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
        }
      } catch (error) {
        console.error('Error accessing local media:', error);
      }
    };

    startLocalVideo();
  }, [peerConnection]);

  async function generateLocalOffer() {
    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      setLocalOffer(offer);
      console.log('Local description set:', offer);
      console.log('Signaling State after setting local description:', peerConnection.signalingState);

      // Continue with the rest of the process.
    } catch (error) {
      console.error('Error setting local description:', error);
    }
  }

  async function handleRemoteAnswerSubmit() {
    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    const offer = localOffer; // Use the generated local offer
    const remoteAnswerDesc = JSON.parse(remoteAnswer);

    try {
      if (peerConnection.signalingState === 'have-local-offer' || peerConnection.signalingState === 'have-remote-offer') {
        console.log('Before setting remote description, Signaling State:', peerConnection.signalingState);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(remoteAnswerDesc));
        console.log('Remote description set:', remoteAnswerDesc);
        console.log('Signaling State after setting remote description:', peerConnection.signalingState);

        // Once the remote description is set successfully, you can proceed with the connection.
      } else {
        console.error('Cannot set remote description in the current state:', peerConnection.signalingState);
      }
    } catch (error) {
      console.error('Error setting remote description:', error);
    }
  }

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

function RemoteVideo({ peerConnection }) {
  const remoteVideoRef = useRef(null);
  const [remoteOffer, setRemoteOffer] = useState('');
  const [remoteAnswer, setRemoteAnswer] = useState('');

  useEffect(() => {
    const startRemoteVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteVideoRef.current.srcObject = stream;

        if (peerConnection) {
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
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

    try {
      if (pc.signalingState === 'have-local-offer' || pc.signalingState === 'have-remote-offer') {
        console.log('Before setting remote description, Signaling State:', pc.signalingState);
        await pc.setRemoteDescription(new RTCSessionDescription(remoteOfferDesc));
        console.log('Remote description set:', remoteOfferDesc);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        setRemoteAnswer(JSON.stringify(answer, null, 2));
        console.log('Signaling State after setting remote description:', pc.signalingState);
      } else {
        console.error('Cannot set remote description in the current state:', pc.signalingState);
      }
    } catch (error) {
      console.error('Error setting remote description and generating answer:', error);
    }
  }

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

function App() {
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const pc = new RTCPeerConnection();

    // Add an event listener for ICE connection state changes
    pc.oniceconnectionstatechange = (event) => {
      console.log('ICE Connection State:', pc.iceConnectionState);
    };

    // Add an event listener for signaling state changes
    pc.onsignalingstatechange = (event) => {
      console.log('Signaling State:', pc.signalingState);
    };

    setPeerConnection(pc);
  }, []);

  // Memoize the LocalVideo and RemoteVideo components
  const MemoizedLocalVideo = useMemo(() => <LocalVideo peerConnection={peerConnection} />, [peerConnection]);
  const MemoizedRemoteVideo = useMemo(() => <RemoteVideo peerConnection={peerConnection} />, [peerConnection]);

  return (
    <div>
      {MemoizedLocalVideo}
      {MemoizedRemoteVideo}
    </div>
  );
}

export default App;
