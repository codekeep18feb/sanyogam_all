// App.js

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const SendMessage = ({ peerId }) => {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Emit the 'send_message' event with the message content and peer ID
      console.log("aewqrewrqwe", message, peerId);
      socket.emit("send_message", { message, to: peerId });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Send a Message</h2>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const ReceiveMessage = ({ messages }) => {
  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    // Event listener for the 'receive_message' event
    socket.on("receive_message", (data) => {
      console.log("here there was a message");
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div>
      <h1>Peer-to-Peer Text Chat</h1>
      <input
        type="text"
        placeholder="Enter peer ID"
        value={peerId}
        onChange={(e) => setPeerId(e.target.value)}
      />
      <SendMessage peerId={peerId} />
      <ReceiveMessage messages={messages} />
    </div>
  );
};

export default App;
