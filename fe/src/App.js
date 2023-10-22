import React, { useState, useEffect, useRef, useMemo } from 'react';

function LocalVideo({ localPeerConnection }) {
  const localVideoRef = useRef(null);
  const [localOffer, setLocalOffer] = useState(null);
  const [remoteAnswer, setRemoteAnswer] = useState('');

  useEffect(() => {
    const peerConnection = localPeerConnection.current;

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
  }, [localPeerConnection]);

  async function generateLocalOffer() {
    const peerConnection = localPeerConnection.current;

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
    const peerConnection = localPeerConnection.current;

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

function RemoteVideo({ remotePeerConnection }) {
  const remoteVideoRef = useRef(null);
  const [remoteOffer, setRemoteOffer] = useState('');
  const [remoteAnswer, setRemoteAnswer] = useState('');

  useEffect(() => {
    const peerConnection = remotePeerConnection.current;

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
  }, [remotePeerConnection]);

  async function generateRemoteAnswer() {
    const peerConnection = remotePeerConnection.current;

    if (!peerConnection) {
      console.error('RTCPeerConnection is not available.');
      return;
    }

    const remoteOfferDesc = JSON.parse(remoteOffer);

    try {
      if (peerConnection.signalingState === 'have-local-offer' || peerConnection.signalingState === 'have-remote-offer') {
        console.log('Before setting remote description, Signaling State:', peerConnection.signalingState);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(remoteOfferDesc));
        console.log('Remote description set:', remoteOfferDesc);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        setRemoteAnswer(JSON.stringify(answer, null, 2));
        console.log('Signaling State after setting remote description:', peerConnection.signalingState);
      } else {
        console.error('Cannot set remote description in the current state:', peerConnection.signalingState);
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
  const localPeerConnection = useRef(null);
  const remotePeerConnection = useRef(null);

  useEffect(() => {
    localPeerConnection.current = new RTCPeerConnection();
    remotePeerConnection.current = new RTCPeerConnection();

    // Add event listeners and setup your signaling here

  }, []);

  return (
    <div>
      <LocalVideo localPeerConnection={localPeerConnection} />
      <RemoteVideo remotePeerConnection={remotePeerConnection} />
    </div>
  );
}

export default App;
