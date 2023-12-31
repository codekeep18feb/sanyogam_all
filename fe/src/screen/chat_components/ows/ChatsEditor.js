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
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import CallEndIcon from "@material-ui/icons/CallEnd";

const withChatSocket = (Component) => {
  // const JWT_TOKEN = localStorage.getItem("token");
  // const token = `Bearer ${JWT_TOKEN}`;

  return function WithSocketComponent({ auth_data, with_userid, ...props }) {
    const [socket, setSocket] = useState(
      io.connect("http://192.168.1.5:8000", {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    const [allChats, setAllChats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchOnlineProfiles = () => {
        const room = "hardcode";
        socket.emit("fetch_profile_chats", with_userid);
      };

      fetchOnlineProfiles();

      const intervalId = setInterval(() => {
        fetchOnlineProfiles();
      }, 1000);

      socket.on("fetch_profile_chats", (data) => {
        if (data) {
          console.log("dafsfasd", data.room);
          const pdata = JSON.parse(data);
          console.log("sdfasdf", pdata);
          const f_data = pdata; //.filter((i) => (i.frm_user === with_userid));

          setAllChats((prevChats) => {
            if (!prevChats) {
              setAllChats(f_data);
              setLoading(false);
            } else if (prevChats && f_data.length !== prevChats.length) {
              setAllChats(f_data);
              setLoading(false);
            }
            return prevChats;
          });
        }
      });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        clearInterval(intervalId);
        socket.disconnect();
      };
    }, [socket, with_userid]);

    return (
      <Component
        auth_data={auth_data}
        allChats={allChats}
        loading={loading}
        {...props}
        with_userid={with_userid}
      />
    );
  };
};

const ChatScreenHeader = ({
  setVideoMode,
  videoMode,
  with_userid,
  // with_email,
  SetWithUserId,
  SetWithEmail,
  onBackClick,
  user,
}) => {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={1}>
          <ArrowBackIcon onClick={onBackClick} style={{ cursor: "pointer" }} />
        </Grid>
        <Grid item xs={2}>
          <ImageCircle dimention={50} user={user} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="textPrimary" align="center" noWrap>
            {user.name}
          </Typography>
          <div
            style={{
              color: user.online ? "#00E676" : "inherit",
              align: "left",
              fontSize: 12,
            }}
          >
            {user.online ? "Online" : ""}
          </div>
        </Grid>
        <Grid item xs={2}>
          <AudioCallIcon style={{ fontSize: "35px", color: "#1F4294" }} />
        </Grid>
        <Grid item xs={2}>
          <VideoCallIcon
            disabled={!videoMode}
            onClick={(e) => {
              console.log("arerewqrwer");
              e.preventDefault();
              setVideoMode(true);
            }}
            style={
              !videoMode
                ? { fontSize: "35px", color: "#1F4294" }
                : { fontSize: "35px", color: "black" }
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

function ChatsEditor({
  auth_data,
  allChats,
  loading,
  // with_email,
  with_userid,
  SetWithUserId,
  SetWithEmail,
}) {
  const [connection_open, setConnectionOpened] = useState(false);
  console.log("is it opened?", connection_open);
  const [videoMode, setVideoMode] = useState(false);
  const [signal_pool, setSignalPool] = useState({});
  const [callStatus, setCallStatus] = useState({ status: null });

  const myVideoRef = useRef(null);
  const myRef = useRef(null);

  console.log("logged in user", auth_data, videoMode);
  console.log("if it renders without a click", signal_pool);
  console.log("this shoudl not rerender if other twos are toaking", videoMode);

  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.5:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  const initializeWebRTC = async (token, type) => {
    if (type == "INITIATOR") {
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
          socket.emit("signal_pool", offer_str, with_userid);

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
    } else if (type == "RESPONDER") {
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
      const p_offer = JSON.parse(signal_pool.sdp);
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

        setConnectionOpened(true);
      }
    });
  };

  useEffect(async () => {
    console.log("nowwht", signal_pool, typeof signal_pool);
    const ifPoolEmpty = () => Object.keys(signal_pool).length == 0;

    let cs = { status: null };
    if (ifPoolEmpty()) {
      console.log("wevewrqwe here", videoMode);
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;
      if (videoMode) {
        console.log("areweinvideomode");
        const [lc] = await initializeWebRTC(token, "INITIATOR");
        // console.log("dowehave dc",dc)

        if (lc) {
          console.log(lc, "what is this lc");
          console.log(lc, "myRef's current value:", myRef.current);
          myRef.current = {
            type: "INITIATOR",
            channel: lc,
          };
          attachRightListnersToRef();
          cs.status = "OUTGOINGCALL";
        }
      }
    } else {
      //if pool is filled already let's chceck first if there are no offers

      if (
        signal_pool.sdp &&
        signal_pool.answer &&
        signal_pool.initiator == auth_data.id
      ) {
        cs.status = "ANSWEREDWATINGFORCONNECTION";
        const answer = JSON.parse(signal_pool.answer);

        myRef.current.channel
          .setRemoteDescription(answer)
          .then((a) => {
            console.log("dowseseethantythere");
            console.log(
              "Signaling State after setting answer on setRemoteDescription: RESPONDER",
              myRef.current.channel.signalingState
            );
          })
          .catch((error) => {
            console.error("Error setting remote description:", error);
          });
      }
    }

    //if OFFER is there -  Object.keys(signal_pool).length == 1 && signal_pool.offer && !signal_pool.answer

    //if ANS is there Object.keys(signal_pool).length == 1 && signal_pool.offer && signal_pool.answer

    // setting correct callStatus
    if (cs) {
      setCallStatus((prv) => {
        if (prv.status !== cs.status) {
          return cs;
        }
        return prv;
      });
    }
  }, [signal_pool, videoMode]);

  useEffect(() => {
    const fetchRtcInfo = () => {
      socket.emit("signal_pool", null, with_userid);
    };

    const ifMyDataExist = (data, with_userid, auth_data_id, second_case) => {
      if (second_case) {
        console.log("shoubl not be sam1", with_userid, auth_data_id);
      } else {
        console.log("shoubl not be sam2", with_userid, auth_data_id);
      }
      let ret_val = null;
      let room_str = `${with_userid}_${auth_data_id}`;
      console.log("room_strdfdf", room_str);

      for (let i in data) {
        const item = data[i];
        console.log("arewegoing", item, item["initiator"], with_userid);

        if (Number(item["initiator"]) == with_userid) {
          //RESPONDER CASE
          room_str = `${auth_data_id}_${with_userid}`;
        }
        console.log("whatisthis", item, room_str, second_case);
        // console.log('iiii',i)
        if (item["id"] === room_str) {
          ret_val = item;
          break;
          // setSignalPool
        }
      }
      return ret_val;
    };

    let intervalId;
    fetchRtcInfo();

    intervalId = setInterval(() => {
      fetchRtcInfo();
    }, 50000);

    socket.on("signal_pool", (data) => {
      if (data) {
        console.log("dafsuyiiuytfasd", data, typeof data);
        if (data) {
          const p_data = JSON.parse(data);
          const d_type = myRef && myRef.current ? myRef.current.type : null;
          console.log("amiherenow", p_data);
          let ret_data = ifMyDataExist(
            p_data,
            (with_userid = with_userid),
            auth_data.id,
            true
          );
          // const ret_data2 = ifMyDataExist(p_data,auth_data.id,with_userid=with_userid,false)
          console.log(signal_pool, "ret_dsfsddata", ret_data);
          if (ret_data) {
            setSignalPool(ret_data);
          }
        }
        const pdata = JSON.parse(data);
        console.log("abcdef", pdata, myRef, with_userid);
      }
    });

    socket.on("connect", () => {
      console.log("Socket_pool connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket_pool disconnected");
    });

    return () => {
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, [socket]);
  const handleAcceptCall = () => {
    // Add logic for accepting the call
    // For example: setCallStatus({ status: 'ACCEPTED' });
  };

  const handleDisconnectCall = () => {
    if (myRef.current && myRef.current.channel) {
      console.log(
        "how can i gracefully disconnect the streams on this channel so the this is the question to chatgpt"
      );
      myRef.current.channel.close();
    }
    // Add logic for disconnecting the call
    // For example: setCallStatus({ status: 'DISCONNECTED' });
  };
  // const chatScreenBody = (
  //   <div>
  //     {loading &&  <CircularProgress />}

  //     {!loading && videoMode && (
  //       // <VideoComp with_userid={with_userid} callStatus={callStatus} setCallStatus={setCallStatus}/>
  //       <div>
  //         <div>
  //           {["INITIALIZING", "OUTGOINGCALL", null].includes(callStatus.status) && (
  //             <PhoneCallUI callStatus={callStatus}
  //             with_userid={with_userid}

  //             />
  //           )}
  //         </div>
  //         <div style={{ display: connection_open ? "block" : "none" }}>
  //           <div>here is video INITIATOR</div>
  //           <video
  //             ref={myVideoRef} // Add a ref to the video element
  //             autoPlay
  //             playsInline
  //             muted // You may want to remove this if it's not the local video
  //           ></video>
  //         </div>
  //       </div>
  //     )}
  //     {!loading && allChats && !videoMode && (
  //       <NewChatScreen chats={allChats}
  //       to_userid={with_userid} />
  //     )}
  //   </div>
  // );
  const chatScreenBody = (
    <div>
      {loading && <CircularProgress />}

      {!loading && videoMode && (
        <div>
          <div>
            {["INITIALIZING", "OUTGOINGCALL", null].includes(
              callStatus.status
            ) && (
              <div>
                <PhoneCallUI
                  callStatus={callStatus}
                  with_userid={with_userid}
                />
                {/* Add Accept and Disconnect buttons */}
                <div>
                  <IconButton color="primary" onClick={handleAcceptCall}>
                    <PhoneIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={handleDisconnectCall}>
                    <CallEndIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
          {/* <div style={{ display: connection_open ? "block" : "none" }}> */}
          <div
            style={{
              display: connection_open ? "block" : "none",
              position: "relative",
            }}
          >
            <div>here is video INITIATOR</div>
            <video
              ref={myVideoRef} // Add a ref to the video element
              autoPlay
              playsInline
              muted // You may want to remove this if it's not the local video
            ></video>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "50%",
                zIndex: 1,
              }}
            >
              <IconButton color="secondary" onClick={handleDisconnectCall}>
                <CallEndIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
      {!loading && allChats && !videoMode && (
        <NewChatScreen chats={allChats} to_userid={with_userid} />
      )}
    </div>
  );

  // Define the functions for handling accept and disconnect actions

  return (
    <div>
      <ChatScreenHeader
        // ref={myRef}
        setVideoMode={setVideoMode}
        videoMode={videoMode}
        // setVideoMode={setVideoMode}
        // with_userid={with_userid}
        // with_email={with_email}
        // SetWithUserId={SetWithUserId}
        // SetWithEmail={SetWithEmail}
        onBackClick={() => {
          SetWithUserId(null);
          SetWithEmail(null);
        }}
        user={{
          online: true,
          imageUrl:
            "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1",
          // ,"name":'deepak si'
        }}
      />
      {chatScreenBody}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

export default connect(mapStateToProps)(withChatSocket(ChatsEditor));
