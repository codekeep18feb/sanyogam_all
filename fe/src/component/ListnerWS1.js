import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ListnerWS1 = () => {
  const [socket, setSocket] = useState(io.connect("http://192.168.1.5:8000"));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const userAgent = navigator.userAgent;
  const [browserName, setBrowserName] = useState("");

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Chrome") !== -1) {
      setBrowserName("Google Chrome");
    } else if (userAgent.indexOf("Firefox") !== -1) {
      setBrowserName("Mozilla Firefox");
    } else if (userAgent.indexOf("Safari") !== -1) {
      setBrowserName("Apple Safari");
    } else if (userAgent.indexOf("Edge") !== -1) {
      setBrowserName("Microsoft Edge");
    } else if (
      userAgent.indexOf("Opera") !== -1 ||
      userAgent.indexOf("OPR") !== -1
    ) {
      setBrowserName("Opera");
    } else if (userAgent.indexOf("Trident") !== -1) {
      setBrowserName("Internet Explorer");
    } else {
      setBrowserName("Unknown Browser");
    }
  }, []);

  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     console.log('this should be same for all theclients :)',data)
  //   socket.emit('message', message);

  //   });

  //   return () => {
  //     // socket.disconnect();
  //   console.log('will it only run if unmounting is happening')
  //   };
  // }, [socket]);

  React.useEffect(() => {
    socket.on("message", (data) => {
      console.log("arerwehere??", data);
      setMessages([...messages, data]);
    });

    return () => {
      socket.disconnect();
      console.log("will it only run if unmounting is happening");
    };
  }, []);

  return (
    <div>
      <div>dfasdf</div>
      <Button
        onClick={(e) => {
          // e.preventDefault()
          sendMessage("HARDCODED MESSAGE from" + userAgent);
        }}
      >
        Send WS msg
      </Button>
    </div>
  );
};

export default ListnerWS1;
