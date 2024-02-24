import React from 'react';
import { useLocation } from 'react-router-dom';
import IncomingCallUIL from './IncomingCallUIL';

function IncomingCallUI({ incoming_call_data }) {
  // const location = useLocation();
  // const incomingCallData = location.state?.incomingCallData;

  // Use incomingCallData as needed
  console.log('incomingCallData', incoming_call_data)
  return (

    <div style={{border:"1px solid green"}}>

      {incoming_call_data ? <IncomingCallUIL incoming_call_data={incoming_call_data} /> : "loading"}
    </div>

  );
}

export default IncomingCallUI;
