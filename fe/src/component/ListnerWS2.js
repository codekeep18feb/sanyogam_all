import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ListnerWS2 = () => {
  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.2:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  // const [socket, setSocket] = useState(io.connect('http://192.168.1.2:8000'));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const userAgent = navigator.userAgent;
  const [browserName, setBrowserName] = useState("");

  React.useEffect(() => {
    console.log("fjasdf");
    socket.on("signal_pool", (data) => {
      console.log("asrere we getting the mess here", data);
      // console.log('arerwehere??',data)
      // setMessages([...messages, data]);
    });

    // return () => {
    //   socket.disconnect();
    // console.log('will it only run if unmounting is happening')
    // };
  }, []);

  return (
    <div>
      <div>ListnerWS2</div>
      {/* <Button onClick={(e)=>{
        // e.preventDefault()
        sendMessage('HARDCODED MESSAGE from'+userAgent)
      }}>Send WS msg</Button> */}
    </div>
  );
};

export default ListnerWS2;
