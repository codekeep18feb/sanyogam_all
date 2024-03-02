import React, { useState, useRef } from "react";
import io from "socket.io-client";
import { CircularProgress, Grid } from "@mui/material";

import PhoneCallUI from "./PhoneCallUI";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Modal.css"; // Import your modal styles

function IncomingCallUIL({
  incoming_call_data,
  auth_data,
  // incoming_call_data.to_userid,
}) {
  // const location = useLocation();
  // const incoming_call_data = location.state?.incoming_call_data;

  const sendAGlobalEventApi = async (with_userid, token, data) => {
    try {
      const response = await fetch(
        `http://192.168.1.5:8001/new_global_event_data/${with_userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully posted global event");
        return data;
      } else {
        console.log("Error fetching chat history");
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      // setLoading(false);
    }
  };

  // console.log('waht is type of',incoming_call_data)
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
    io.connect("ws://192.168.1.13:8000", {
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
          `${auth_data.id}_${incoming_call_data.to_userid}`
        );
        //THIS IS WHERE WILL MAKE
        // const to_user_id = await fetchUserId(token, with_email);
        const answer = JSON.stringify(rc.localDescription);
        const offer_obj = { answer: answer, action: "UPDATE" };
        const offer_str = JSON.stringify(offer_obj);
        console.log("hereisyourans", offer_str);
        if (offer_str) {
          const JWT_TOKEN = localStorage.getItem("token");
          const token = `Bearer ${JWT_TOKEN}`;
          const data = {
            type: "call",
            status: "accepted_incoming",
            answer: offer_str,
          };
          console.log(
            "shouldnot we send the offer as well to be verified",
            incoming_call_data.offer
          );

          sendAGlobalEventApi(incoming_call_data.frm_userid, token, data);
        }
        // socket.emit("signal_pool", offer_str, incoming_call_data.to_userid);
        // saveRTCUserAns(
        //   false,
        //   JSON.stringify(rc.localDescription),
        //   to_user_id
        // );
      }
    };
    console.log(
      "iwonderif",
      typeof incoming_call_data.offer,
      incoming_call_data.offer
    );
    const p_offer = JSON.parse(incoming_call_data.offer);
    console.log("whatisitnow", p_offer, typeof p_offer);
    // const offer_str = await fetchRTCOffer();
    // console.log(p_offer, 'what is the diff', offer_str)
    rc.setRemoteDescription(JSON.parse(p_offer.sdp)).then((a) => {
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

  const navigate = useNavigate();
  const attachRightListnersToRef = () => {
    myRef.current.channel.addEventListener("iceconnectionstatechange", () => {
      console.log(
        "ICE Connection State changed:",
        myRef.current.channel.iceConnectionState
      );

      if (
        myRef.current.channel.iceConnectionState === "closed" ||
        myRef.current.channel.iceConnectionState === "failed"
      ) {
        console.log("disconnected now");
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
      if (
        myRef.current.channel.connectionState === "closed" ||
        myRef.current.channel.connectionState === "failed"
      ) {
        console.log("disconnected now connectionstatechange");
        navigate("/snsydwh");

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
    const [rc] = await initializeWebRTC(token);
    console.log("here is your rc save it myRef if you need", rc);
    myRef.current = {
      type: "RESPONDER",
      channel: rc,
    };
    attachRightListnersToRef();
    // startTheConnection();
  };

  const chatScreenBody = (incoming_call_data) => {
    console.log("iincoming_call_data", incoming_call_data, auth_data.id);
    return (
      <div>
        {!incoming_call_data && <CircularProgress />}

        {incoming_call_data.to_userid == auth_data.id &&
          incoming_call_data.offer &&
          !incoming_call_data.answer && (
            <div className="modal">
              <div className="modal-content">
                {!connection_open && (
                  <PhoneCallUI
                    // callStatus={"INITIALIZING"}
                    pickUpTheCall={pickUpTheCall}
                  // incoming_call_data.to_userid={incoming_call_data.to_userid}
                  />
                )}

                <div
                  style={{
                    display: connection_open ? "block" : "none",
                    border: "1px solid red",
                  }}
                >
                  <video
                    ref={myVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "2px solid blue",
                    }} // Apply CSS styles to control width and maintain aspect ratio
                  ></video>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  };

  return <div>{chatScreenBody(incoming_call_data)}</div>;
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

// export default connect(mapStateToProps)(withChatSocket(IncomingCallUIL));
export default connect(mapStateToProps, null)(IncomingCallUIL);
