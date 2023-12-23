import React, { useEffect, useState, useRef } from "react";
import RequestScreen from "../RequestScreen";
import ChatScreen from "./ChatScreen";
import { withTheme } from "@emotion/react";
import io from 'socket.io-client';

export default function ChatWindowWS() {
  const [socket, setSocket] = useState(io.connect('http://192.168.1.13:8000'));

  React.useEffect(() => {
    
    socket.on('custom_event', (data) => {
      console.log('letsee if we are getting the data here...',data,typeof(data))
      // sdpExchange("initaiated_bwf_responder");
      // if (data){
      //   const p_data = JSON.parse(data)
      //   console.log("p_dadsta",p_data)
      //   // data
      //   // data.sdp
      //   // const psdp = JSON.parse(p_data.sdp)
      //   const now = new Date();

      //   // Get the current time
      //   const hours = now.getHours();
      //   const minutes = now.getMinutes();
      //   const seconds = now.getSeconds();

      //   // Display the current time
      //   console.log(`${JSON.stringify(p_data)} @Current time: ${hours}:${minutes}:${seconds}`);
      //   console.log('whatisin resp case on respo',p_data)
      //   // if (p_data.sdp && p_data.answer==null){
      //   //   if (p_data.sdp.length>0){
      //   //     console.log('wisadf now sdfcase')
      //   //     sdpExchange("initaiated_bwf_responder");

      //   //   }
      //   // }
      //   // else if (p_data.sdp && p_data.answer!=null){
      //   //   console.log('WE ARE NEVER COMING HERE')
      //   //   if (p_data.answer.length>0){
      //   //     console.log('wisadf now case')
      //   //     sdpExchange("responded_wfc");
      //   //     // myRef.current = {
      //   //     //   ...myRef.current,
      //   //     //   answer: p_data.answer,
      //   //     // };
      //   //     setAnswer(true);

      //   //   }
      //   // }
      //   // else if (psdp.type=='answer'){
      //   //   if (psdp.sdp.length>0){
      //   //     sdpExchange("responded_wfc");

      //   //   }
      //   // }
        
      //   //if it has an offer let's call it done

      // }
    });

    return () => {
      // socket.disconnect();
    console.log('will it only run if unmounting is happening')
    };
  }, []);
  return (
    <div>ChatWindowWS</div>
  )
}
