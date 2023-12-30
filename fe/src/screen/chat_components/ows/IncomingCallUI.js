import React from 'react';
import { useLocation } from 'react-router-dom';
import IncomingCallUIL from './IncomingCallUIL';

function IncomingCallUI() {
  const location = useLocation();
  const incomingCallData = location.state?.incomingCallData;

  // Use incomingCallData as needed

  return (
    // Your component JSX
    // <div>incoming calldata - {typeof(incomingCallData.initiator)}</div>
    <IncomingCallUIL with_userid={incomingCallData.initiator} />
    // 
  );
}

export default IncomingCallUI;
