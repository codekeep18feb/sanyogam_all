import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import NewChatScreen from "./NewChatScreen";
import { CircularProgress, Grid } from "@mui/material";
import ChatsOWSTile from "./ChatsOWSTile";
import SendIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ImageCircle } from "../../chat_components/ImageCircle";
import AudioCallIcon from "@mui/icons-material/Call";
import { Typography } from "@material-ui/core";
import PhoneCallUI from "../../PhoneCallUI";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";





function IncomingCallUIL({
  auth_data,
  allChats,
  loading,
  // with_email,
  with_userid,
  SetWithUserId,
  SetWithEmail,
}) {
  
  const location = useLocation();
  const incomingCallData = location.state?.incomingCallData;

  // console.log('waht is type of',incomingCallData)
  const [connection_open, setConnectionOpened] = useState(false);
  console.log("is it opened?", connection_open);
  // const [videoMode, setVideoMode] = useState(false);
  // const [signal_pool, setSignalPool] = useState({});
  // const [callStatus, setCallStatus] = useState({"status":null});

  const myVideoRef = useRef(null);
  const myRef = useRef(null);

  // console.log("logged in user", auth_data, videoMode);
  // console.log("if it renders without a click", signal_pool);
  // console.log("this shoudl not rerender if other twos are toaking", videoMode);

  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.2:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  const initializeWebRTC = async (token) => {
    console.log("Ensure it's not called multiple times...");
      const rc = new RTCPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("doweseestream", stream);
      myVideoRef.current.srcObject = stream;
      rc.addStream(stream);
      console.log("doweseestream", stream);
      rc.onaddstream = (event) => {
        console.log("ON REMOTE @ TRACK", event, event.stream, myRef.current);
        myVideoRef.current.srcObject = event.stream;
      };

      rc.ondatachannel = (event) => {
        // Handle the data channel when it is created
        const dataChannel = event.channel;

        dataChannel.onopen = () => {
          console.log("Data channel opened!");
          // You can add any specific actions you want to perform when the data channel is open.
        };

        // Handle other data channel events if needed
      };

      rc.onicecandidate = async (e) => {
        if (e.candidate) {
          console.log(
            "whatisthestatus?" + JSON.stringify(rc.localDescription),
            `${auth_data.id}_${with_userid}`
          );
          //THIS IS WHERE WILL MAKE
          // const to_user_id = await fetchUserId(token, with_email);
          const answer = JSON.stringify(rc.localDescription);
          const offer_obj = { answer: answer, action: "UPDATE" };
          const offer_str = JSON.stringify(offer_obj);
          console.log("AREWEHERE");
          socket.emit("signal_pool", offer_str, with_userid);
          // saveRTCUserAns(
          //   false,
          //   JSON.stringify(rc.localDescription),
          //   to_user_id
          // );
        }
      };
      const p_offer = JSON.parse(incomingCallData.sdp);
      // const offer_str = await fetchRTCOffer();
      // console.log(p_offer, 'what is the diff', offer_str)
      rc.setRemoteDescription(p_offer).then((a) => {
        console.log("set remoteDescription with local offer");
        console.log(
          "Signaling State after setting remoteDescription",
          rc.signalingState
        );
      });

      rc.createAnswer()
        .then((a) => {
          rc.setLocalDescription(a);
          console.log(
            "Signaling State after setting Local description set as a provisional answer.:",
            rc.signalingState
          );
        })
        .then((a) => {
          console.log("answer created");
          console.log(
            "Signaling State after setting Local description set as a provisional answer.:",
            rc.signalingState
          );
        });
      return [rc];
  };

  const navigate = useNavigate()
  const attachRightListnersToRef = () => {
    myRef.current.channel.addEventListener("iceconnectionstatechange", () => {
      console.log(
        "ICE Connection State changed:",
        myRef.current.channel.iceConnectionState
      );

      if (myRef.current.channel.iceConnectionState === 'closed' ||
          myRef.current.channel.iceConnectionState === 'failed') {
            console.log('disconnected now')
        // The connection is closed or failed
        // Update call status accordingly
        // For example: setCallStatus({ status: 'DISCONNECTED' });
      }

      // if (myRef.current.channel.iceConnectionState === 'connected') {
      //   // ICE connection is fully established
      //   setConnectionOpened(true);
      // }
    });

    myRef.current.channel.addEventListener("connectionstatechange", () => {
      console.log(
        "Connection State changed:",
        myRef.current.channel.connectionState
      );
      if (myRef.current.channel.connectionState === 'closed' ||
      myRef.current.channel.connectionState === 'failed') {
        console.log('disconnected now connectionstatechange')
        navigate('/snsydwh')


    // The connection is closed or failed
    // Update call status accordingly
    // For example: setCallStatus({ status: 'DISCONNECTED' });
  }
      // if (myRef.current.channel.connectionState === 'connected') {
      //   // Connection is fully established
      //   setConnectionOpened(true);
      // }
    });

    myRef.current.channel.addEventListener("signalingstatechange", () => {
      console.log("AREWHEREWREVER");
      console.log(
        typeof myRef.current.channel,
        myRef.current.channel,
        "Signaling State changed:",
        myRef.current.channel.signalingState,
        myRef.current.channel.iceConnectionState,
        myRef.current.channel.connectionState
      );
      if (myRef.current.channel.signalingState === "stable") {
        // console.log('so this is INITIATOR CASE')
        console.log("in INITIATOR connection stateus");

        setConnectionOpened(true);
      }
    });
  };



  const pickUpTheCall = async () => {
    console.log("pickUpTheCall");
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    const [rc] = await initializeWebRTC(token)
    console.log("here is your rc save it myRef if you need", rc);
    myRef.current = {
      type: "RESPONDER",
      channel: rc,
    };
    attachRightListnersToRef();
    // startTheConnection();
  };


  const chatScreenBody = (
    <div>

      {(loading && !incomingCallData) && <CircularProgress />}
    
      {incomingCallData.responder==auth_data.id && incomingCallData.sdp && !incomingCallData.answer && (
        <div>
          <div>
            {!connection_open && <PhoneCallUI
              // callStatus={"INITIALIZING"}
              pickUpTheCall={pickUpTheCall}
              // with_userid={with_userid}
            />}
          </div>
          <div style={{ display: connection_open ? "block" : "none" }}>
          <div>here is video RESPONDER</div>
            
            <div style={{width:"100%",height:"100%"}}>
            <video
              ref={myVideoRef} // Add a ref to the video element
              autoPlay
              playsInline
              muted // You may want to remove this if it's not the local video
            ></video>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  return (
    <div>
     
      {chatScreenBody}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

// export default connect(mapStateToProps)(withChatSocket(IncomingCallUIL));
export default connect(mapStateToProps,null)(IncomingCallUIL);
