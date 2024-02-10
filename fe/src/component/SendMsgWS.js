import React, { useState } from "react";
import io from "socket.io-client";

const SendMsgWS = () => {
  // const [socket, setSocket] = useState(
  //   io.connect('http://192.168.1.9:8001')
  // );
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.9:8001', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  // const [socket, setSocket] = useState(io.connect('http://192.168.1.9:8001'));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [room_id, setRoomId] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  const sendMessage = () => {
    // const prefix = selectedPrefix || 'AC'; // Use 'AC' as the default prefix
    const message = messageInput;
    console.log("werewehere 2nd time");
    socket.emit("listen_global_events");
    setMessageInput("");
    setRoomId("");
  };

  React.useEffect(() => {
    socket.on("listen_global_events", (data) => {
      console.log("do we see this here after", data);
      // setMessages([...messages, data]);
    });

    // return () => {
    //   socket.disconnect();
    // console.log('will it only run if unmounting is happening')
    // };
  }, []);

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
            defaultChecked={selectedPrefix === null || selectedPrefix === "AC"}
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
      <input
        type="text"
        value={room_id}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Type room_id"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        Send
      </button>
    </div>
  );
};

export default SendMsgWS;
