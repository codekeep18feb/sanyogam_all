import React, { useState } from "react";
import io from "socket.io-client";

const MyWSComponent = () => {
  const [socket, setSocket] = useState(io.connect('http://192.168.1.9:8001'));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("AC");

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  const sendMessage = () => {
    const message = selectedPrefix + messageInput;
    socket.emit("message", message);
    setMessageInput("");
  };

  React.useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, socket]);

  return (
    <div>
      <h1>WebSocket Echo</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <div>
        <label>
          <input
            type="radio"
            name="prefix"
            value="AC"
            checked={selectedPrefix === "AC"}
            onChange={handlePrefixChange}
          />{" "}
          AC
        </label>
        <label>
          <input
            type="radio"
            name="prefix"
            value="DC"
            checked={selectedPrefix === "DC"}
            onChange={handlePrefixChange}
          />{" "}
          DC
        </label>
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MyWSComponent;
