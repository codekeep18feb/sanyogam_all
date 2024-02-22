import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AudioCallIcon from "@mui/icons-material/Call";
import { connect, useSelector } from "react-redux";
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';


import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from 'react';
import WrapperChatShellWithSend from "./WrapperChatShellWithSend";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhoneCallUI from "../incomingcallui_route/PhoneCallUI";

const makeTriggerCall = async (with_userid, frm_id, message) => {
  try {
    const data = {
      "frm_id": frm_id,
      "to_id": with_userid,
      "message": message
    }
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    console.log('dsfhere is with_userid', with_userid)
    const response = await fetch(
      `http://192.168.184.35:8001/new_data_event_trigger/${with_userid}`,
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
      console.log("successfully fetched user");
      return data
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh', // Set the container height to 100% of the viewport height
    overflowY: 'auto', // Add vertical scrollbar if content overflows
  },
  segment1: {
    flex: '0 0 10%', // 10% height, don't grow or shrink
    backgroundColor: 'lightblue',
  },
  segment2: {
    flex: '1 0 80%', // 80% height, grow as needed, don't shrink
    backgroundColor: 'lightgreen',
  },
  segment3: {
    flex: '0 0 10%', // 10% height, don't grow or shrink
    backgroundColor: 'lightcoral',
  },
  bottom: {
    position: 'sticky',
    bottom: 0,
    height: '10vh', // Set the height to 10% of the viewport height
    backgroundColor: 'white',
    padding: '10px', // Add some padding for spacing
  },
});


const sendAGlobalEventApi = async (with_userid, token, data) => {
  try {

    const response = await fetch(
      `http://192.168.184.35:8001/new_global_event_data/${with_userid}`,
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
      return data
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

const initialState = {
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    case 'RESET_MESSAGE':
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};


const ChatsEditor = ({ SetWithUserId, auth_data, with_userid, all_chats }) => {
  const myVideoRef = useRef(null);
  const myRef = useRef(null);
  const [current_cs, setCallingStatus] = useState(null)
  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.13:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  const allGlobalData = useSelector((state) => {
    console.log("state here dsf", state);
    return state.globalData;
  });
  console.log("does call got accepted?? inchats editory", allGlobalData);



  const sendAGlobalEventApi = async (with_userid, token, data) => {
    try {

      const response = await fetch(
        `http://192.168.184.35:8001/new_global_event_data/${with_userid}`,
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
        return data
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

  const initializeWebRTC = async (token, type) => {
    console.log('INSIDE initializeWebRTC')
    if (type === "INITIATOR") {
      console.log("Ensure it's not called multiple times...");

      const lc = new RTCPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("doweseestream", stream);
      myVideoRef.current.srcObject = stream;
      lc.addStream(stream);
      lc.onaddstream = (event) => {
        console.log("ON LOCAL @ TRACK", event, event.stream);
        myVideoRef.current.srcObject = event.stream;

        // setRemoteStream(event.stream);
      };

      lc.onicecandidate = async (e) => {
        if (e.candidate) {
          // Candidate is available, but don't save it yet
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
          // ICE gathering is complete, save the final ICE candidate to the database
          console.log("ICE gathering is complete");
          // const to_user_id = await fetchUserId(token, with_email);
          // console.log(
          //   "Final ICE candidate:",
          //   JSON.stringify(lc.localDescription)
          // );
          const offer = JSON.stringify(lc.localDescription);
          const offer_obj = { sdp: offer, action: "ADD" };
          const offer_str = JSON.stringify(offer_obj);
          console.log("this is offer str", offer_str);
          const data = {
            "type": "call",
            "status": "incoming",
            "video": true,
            "audio": true,
            "offer": offer_str,
            "answer": null
          }

          const res = await sendAGlobalEventApi(with_userid, token, data)
          if (res['success']) {
            setCallingStatus("calling")

          }
          else {
            setCallingStatus("failed")

          }

          console.log('HERE IS RES yeah ::::))))', res)
          // socket.emit("signal_pool", offer_str, with_userid);

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
    } else if (type === "RESPONDER") {
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
          const offer_obj = { answer: answer, with_userid: with_userid };
          const offer_str = JSON.stringify(offer_obj);
          console.log("AREWEHERE@answers");
          const data = {
            "type": "accepting",
            "answer": offer_str
          }

          const res = await sendAGlobalEventApi(with_userid, token, data)
          if (res['success']) {
            setCallingStatus("accepted_call")

          }
          else {
            setCallingStatus("accepting_failed")

          }

          // socket.emit("signal_pool", offer_str, with_userid);
          // saveRTCUserAns(
          //   false,
          //   JSON.stringify(rc.localDescription),
          //   to_user_id
          // );
        }
      };
      // const p_offer = JSON.parse(signal_pool.sdp);
      // const offer_str = await fetchRTCOffer();
      // console.log(p_offer, 'what is the diff', offer_str)
      // rc.setRemoteDescription(p_offer).then((a) => {
      //   console.log("set remoteDescription with local offer");
      //   console.log(
      //     "Signaling State after setting remoteDescription",
      //     rc.signalingState
      //   );
      // });

      // rc.createAnswer()
      //   .then((a) => {
      //     rc.setLocalDescription(a);
      //     console.log(
      //       "Signaling State after setting Local description set as a provisional answer.:",
      //       rc.signalingState
      //     );
      //   })
      //   .then((a) => {
      //     console.log("answer created");
      //     console.log(
      //       "Signaling State after setting Local description set as a provisional answer.:",
      //       rc.signalingState
      //     );
      //   });
      return [rc];
    }
  };

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

        // setConnectionOpened(true);
      }
    });
  };



  console.log('on chatseditor myref', myRef.current)
  const [callStatus, setcallStatus] = useState(null)
  // const [socket, setSocket] = useState(null);
  const [my_room, setMyRoomAs] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { message } = state;

  const [dependentVariable, setDependentVariable] = useState("dependent");
  const [chat_data, setChat_data] = useState([])


  const handleSubmit = () => {
    // Handle the submission of the message
    console.log("Submitted message:", message);
    makeTriggerCall(with_userid, auth_data.id, message);
    // setMessage("")
    dispatch({ type: 'RESET_MESSAGE' });
  };

  const classes = useStyles();


  all_chats = all_chats.map(i => {
    return (
      <div style={{ marginTop: "15px", border: "1px solid red", display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            backgroundColor: "#ceebeb",
            padding: "15px 20px",
            width: "80%",
            borderBottomLeftRadius: "25%"
          }}
        >{i.msg}</div>
      </div>
    )
  })


  const setMessage = (message) => {
    dispatch({ type: 'SET_MESSAGE', payload: message });
  }

  const handleOnClick = async () => {
    // e.preventDefault()

    //LET'S GRAB initiatorSdpOffer


    const data = {
      "type": "call",
      "status": "incoming",
      "video": true,
      "audio": true,
      "offer": "myhardcodedfull_sdp",
      "answer": "answer"
    }
    console.log('on click on video icon!!!!!!', data)
    // const sdp = "myhardcodedfull_sdp"
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    // let cs = { status: null };
    setCallingStatus("calling")
    const [lc] = await initializeWebRTC(token, "INITIATOR");
    // console.log("dowehave dc",dc)

    if (lc) {
      console.log(lc, "what is this lc");
      console.log(lc, typeof (lc), "myRef's current value:", myRef.current);
      myRef.current = {
        type: "INITIATOR",
        channel: lc,
      }
    }
    //   attachRightListnersToRef();
    //   data['offer'] = lc
    //   const res = await sendAGlobalEventApi(with_userid, token, data)
    //   console.log("here is the final res", res)
    //   // cs.status = "OUTGOINGCALL";
    // }
    // pass sdp to right room and on right event
    // then the other party listening to it should get it 
    // probably glbal event like thing



  }

  useEffect(() => {
    if (allGlobalData && allGlobalData.answer) {
      const answer_obj = JSON.parse(allGlobalData.answer)
      const answer = JSON.parse(answer_obj.answer)
      console.log("isittriggering only if answer changes??", answer, typeof (answer));
      if (answer) {

        myRef.current.channel
          .setRemoteDescription(answer)
          .then((a) => {
            console.log("answer should be set now on initiator");
            console.log(
              "Signaling State after setting answer on setRemoteDescription:",
              myRef.current.channel.signalingState
            );
          })
          .catch((error) => {
            console.error("Error setting remote description:", error);
          });
      }
      // console.log(
      //   "if INITIATOR I THING WE CAN INITIATE THE CONNECTION??,",
      //   myRef.current,
      //   myRef.current["type"] === "INITIATOR"
      // );
      // if (myRef.current["type"] === "INITIATOR") {
      //   // let's perform the thrid step
      //   console.log(
      //     "hereAnswer",
      //     myRef.current,
      //     myRef.current.answer,
      //     typeof myRef.current.answer
      //   ); //myRef.current.send("douseeme!")
      //   const answer = JSON.parse(myRef.current.answer);
      //   console.log("DOWESEE ANSWER", answer);
      //   // myRef.current.channel.send("douseeme!")
      //   // answer = answer
      //   console.log(
      //     "Signaling State before setting remote description:",
      //     myRef.current.channel.signalingState
      //   );

      //   myRef.current.channel
      //     .setRemoteDescription(answer)
      //     .then((a) => {
      //       console.log("dowseseethantythere");
      //       console.log(
      //         "Signaling State after setting answer on setRemoteDescription:",
      //         myRef.current.channel.signalingState
      //       );
      //     })
      //     .catch((error) => {
      //       console.error("Error setting remote description:", error);
      //     });
      // }
    }
  }, [allGlobalData.answer]);

  return (
    <WrapperChatShellWithSend title={"chats"} onSave={handleSubmit} setMessage={setMessage} message={message}

      onBack={() => {
        SetWithUserId(null)
      }}
    >
      {all_chats}
      {callStatus == 'calling' && <PhoneCallUI
        callStatus={callStatus}
        with_userid={with_userid}
      />}
      <VideoCallIcon
        onClick={handleOnClick}
        style={{ fontSize: "35px", color: "red" }}
      // onClick={() => {
      //   console.log('got video click')
      //   setcallStatus("calling")

      //
      // }
      // }
      />
      <video
        ref={myVideoRef} // Add a ref to the video element
        autoPlay
        playsInline
        muted // You may want to remove this if it's not the local video
      ></video>


    </WrapperChatShellWithSend>
  );
};


const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

export default connect(mapStateToProps)(ChatsEditor);
