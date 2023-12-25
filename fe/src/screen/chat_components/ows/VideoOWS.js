import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import io from "socket.io-client";

const VideoOWS = React.memo(({ with_userid, with_email }) => {
  const [s_pool, sets_pool] = useState(null);
  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.8:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  const myRef = useRef(null);
  const yourVideoRef = useRef(null);

  const initializeWebRTC = async () => {
    const type =
      s_pool && s_pool["offer"] && s_pool["answer"] ? "RESPONDER" : "INITIATOR";
    console.log("here is type with_email", type, s_pool, with_email);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    if (type == "INITIATOR") {
      console.log("Ensure it's not called multiple times...");

      const lc = new RTCPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("doweseedsffstream", stream);
      yourVideoRef.current.srcObject = stream;
      // myRef.current = {"srcObject":stream};
      // setStream(stream);
      lc.addStream(stream);
      lc.onaddstream = (event) => {
        console.log("ON LOCAL @ TRACK", event, event.stream, myRef.current);
        yourVideoRef.current.srcObject = event.stream;
      };

      lc.onicecandidate = async (e) => {
        if (e.candidate) {
          // Candidate is available, but don't save it yet
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
          // ICE gathering is complete, save the final ICE candidate to the database
          console.log("ICE gathering is complete");
          // const to_user_id = await fetchUserId(token, with_email);
          console.log(
            "Final ICE candidate:",
            JSON.stringify(lc.localDescription)
          );
          // addRTCUserInfo(true, JSON.stringify(lc.localDescription), to_user_id);
        }
      };

      lc.createOffer()
        .then((o) => lc.setLocalDescription(o))
        .then((a) => {
          console.log("offer set successfully!");
          console.log(
            "Signaling State after setting local description:",
            lc.signalingState
          );
        });
      return [lc];
    }
  };

  React.useEffect(() => {
    socket.on("signal_pool", (data) => {
      console.log("asrere we getting the mess here", data, typeof data);
      // console.log('arerwehere??',data)
      const d_parse = JSON.parse(data);
      const my_data = d_parse[0]; // later there should be an id filter here
      sets_pool(my_data);
    });
  }, []);

  console.log("spoll", s_pool);
  return (
    <div>
      <div>VideoOWS - {with_userid}</div>
      <Button onClick={() => initializeWebRTC()}>Initialize</Button>
      {JSON.stringify(s_pool)}
      <div>WRTC STATE </div>
      <div>{!s_pool && "initalizing"}</div>
      <div>{s_pool && s_pool.offer && !s_pool.answer && "initiated"}</div>
      <div>{s_pool && s_pool.offer && s_pool.answer && "responded"}</div>
      <video
        ref={yourVideoRef} // Add a ref to the video element
        autoPlay
        playsInline
        muted // You may want to remove this if it's not the local video
        // Add other attributes such as width, height, etc.
      ></video>
    </div>
  );
});

export default VideoOWS;
