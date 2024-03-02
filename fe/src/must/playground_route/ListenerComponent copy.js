import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ListenerComponent2 from './ListenerComponent2';

const ListenerComponent = () => {
  const [incomingData, setIncomingData] = useState([]);
  const [gSocket, setgSocket] = useState(null)
  
  useEffect(() => {
    if (gSocket ) {
      // Join the room corresponding to my_room
      // gSocket.emit("message", { room: "myroomdata" });

      // Event handler for 'new_chat_data_event'
      const handleNewDataEvent = (data) => {
        if(data){
          console.log("cdata ariver",data)
        }
      };

      gSocket.on("message", handleNewDataEvent);
      // Listen for 'new_chat_data_event' events
      // gSocket.on("new_chat_data_event", handleNewDataEvent);

      // Clean up the socket connection on component unmount or when my_room changes
      return () => {
        // gSocket.emit("leave_room", { room: String(my_room) });
        gSocket.off("message", handleNewDataEvent);
      };
    }

    return () => {
      if (gSocket) {
        gSocket.disconnect();
      }
    };

  }, [gSocket]);


  useEffect(() => {
    if (!gSocket) {
      const newSocket = io.connect("ws://192.168.1.5:8001");

     
      setgSocket(newSocket);
      console.log("newsocket will be",newSocket)
    }

    // return () => {
    //   if (gSocket) {
    //     gSocket.disconnect();
    //   }
    // };
  }, [gSocket]); // Dependency only on gSocket



  return (
    <div>
      <h2>Incoming Data:</h2>
      <pre>{JSON.stringify(incomingData, null, 2)}</pre>
    </div>
  );
};

export default ListenerComponent;
