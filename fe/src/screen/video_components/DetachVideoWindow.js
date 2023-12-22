import React from 'react'

export default function DetachVideoWindow({ connection_open, with_email, with_userid }) {
  console.log('wasconnected2',connection_open)
  
  return (
    <div>
      {/* <video
        ref={yourVideoRef} // Add a ref to the video element
        autoPlay
        playsInline
        muted // You may want to remove this if it's not the local video
        // Add other attributes such as width, height, etc.
      ></video><D */}
      
    <div>      DetachVideoWindow connection_open - {JSON.stringify(connection_open)} - {with_email}- {with_userid}</div>

</div>
  )
}
