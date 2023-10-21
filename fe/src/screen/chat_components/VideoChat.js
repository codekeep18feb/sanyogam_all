import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LocalVideo from './LocalVideo';
import RemoteVideo from './RemoteVideo';

function VideoChat() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/local_chat">Local Chat</Link>
          </li>
          <li>
            <Link to="/remote_chat">Remote Chat</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/local_chat" element={<LocalVideo />} />
        <Route path="/remote_chat" element={<RemoteVideo />} />
      </Routes>
    </div>
  );
}

export default VideoChat;
