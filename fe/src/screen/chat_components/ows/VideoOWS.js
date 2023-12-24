import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoOWS = ({with_userid}) => {
  const [s_pool, sets_pool] = useState(null)
  const [socket, setSocket] = useState(
    io.connect('http://192.168.1.13:8000', {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  
  



  React.useEffect(() => {
    socket.on('signal_pool', (data) => {
      console.log('asrere we getting the mess here',data,typeof(data))
      // console.log('arerwehere??',data)
      const d_parse = JSON.parse(data)
      const my_data =d_parse[0] // later there should be an id filter here 
      sets_pool(my_data);
    });

    
  }, []);
  console.log('spoll',s_pool)
  return (
    <div>
      <div>VideoOWS - {with_userid}</div>
      {JSON.stringify(s_pool)}
      <div>WRTC STATE </div>
      <div>{!s_pool && "initalizing"}</div>
      <div>{s_pool && s_pool.offer && !s_pool.answer && "initiated"}</div>
      <div>{s_pool && s_pool.offer && s_pool.answer && "responded"}</div>
    </div>
  );
};

export default VideoOWS;
