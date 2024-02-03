import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const TestWsRightWay = () => {
    // Connect to the WebSocket server
    // Connect to the WebSocket server
    const id = useParams('id')

    useEffect(() => {
    // Connect to the WebSocket server
    // const socket = io.connect("http://your-server-url");
const socket = io.connect("http://192.168.1.13:8000");

    // Event handler for 'new_data_event'
    const handleNewDataEvent = (data) => {
      console.log("New data received:",id, data);
      // Handle the new data as needed
    };

    // Listen for 'new_data_event' events
    socket.on("new_data_event", handleNewDataEvent);

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run the effect only once during component mount

  return (
    <div>
      <h1>WebSocket Component</h1>
      {/* Render your component content here */}
    </div>
  );
};

export default TestWsRightWay;
