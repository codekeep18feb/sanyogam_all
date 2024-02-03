import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const TestWsRightWay = () => {
  const { for_roomid } = useParams();

  useEffect(() => {
    const socket = io.connect("http://192.168.1.13:8001");

    // Join the room corresponding to for_roomid
    socket.emit('join_room', { room: for_roomid });

    // Event handler for 'new_data_event'
    const handleNewDataEvent = (data) => {
      console.log("New data received for room", for_roomid, data);
      // Handle the new data as needed
    };

    // Listen for 'new_data_event' events
    socket.on("new_data_event", handleNewDataEvent);

    // Clean up the socket connection on component unmount
    return () => {
      // Leave the room when the component unmounts
      socket.emit('leave_room', { room: for_roomid });
      socket.disconnect();
    };
  }, [for_roomid]); // Include for_roomid in the dependency array

  return (
    <div>
      <h1>WebSocket Component</h1>
      {/* Render your component content here */}
    </div>
  );
};

export default TestWsRightWay;
