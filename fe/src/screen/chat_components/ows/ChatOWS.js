import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

export default function ChatOWS() {
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000')
  );


  useEffect(() => {
    
    socket.on('custom_event', (data) => {
      console.log('isther any data arrivalsdf',data,typeof(data))
      // setsoc_conn('stage1')
    });

    return () => {
      // socket.disconnect();
    console.log('will it only run if unmounting is happening')
    };
  }, []);

  return (
    <>
    
    <div>
      Left - List all Online Profiles
        makes call to online profiles api for logged in users connection pool
      {/* Left - List all Offline Profiles */}
    </div>

<div>
RIGHT - ChatBox (Can be Done after List)

</div></>
  )
}
