import React, { useEffect, useState, useRef } from "react";
import RequestScreen from "../RequestScreen";
import ChatScreen from "./ChatScreen";
import { withTheme } from "@emotion/react";

import ChatScreenWithInfo from "./ChatScreenWithInfo";

export default function ChatWindow({ with_email, with_userid }) {
  // console.log("here we are", rtcData);
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [chats, setChats] = useState([]);
  const [requestStatus, setRequestStatus] = useState(null);
  const [answer, setAnswer] = useState(false);
  const myRef = useRef(null);
  const [connection_open, setConnectionOpened] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/rtc_user_info_by_id/${with_userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        // setRTCData(data);
        console.log("doesithaveboth?", data.answer, data.sdp);
        if (data && data.answer && data.sdp) {
          console.log("bothexist");
          if (!answer) {
            myRef.current = {
              ...myRef.current,
              answer: data.answer,
            };
            setAnswer(true);
          }
        }
        return Object.entries(data).length === 0 ? null : data;
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRTCUserInfo = async (isInitiator, sdp, to_user) => {
    console.log("hereisto_user", isInitiator, sdp, to_user);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/add_rtc_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            initiator: isInitiator,
            sdp: sdp,
            to_user: to_user,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveRTCUserAns = async (isInitiator, sdp, to_user) => {
    console.log("save answer", isInitiator, sdp, to_user);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/add_rtc_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            initiator: isInitiator,
            sdp: sdp,
            to_user: to_user,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRTCOffer = async () => {
    // console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/rtc_user_info_by_id/${with_userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
        return data;
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserId = async (token, with_email) => {
    // http://192.168.1.13:8000/api/users/query?q_email=deepaksingh.18feb%40gmail.com
    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/users/query?q_email=${with_email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully fetched user", data["id"]);
        return data["id"];
      } else {
        console.log("Error fetching chat history");
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  const initializeNRespondWebRTC = async (token, type) => {
    if (type === "INITIATOR") {
      console.log("Ensure it's not called multiple times...");
      const lc = new RTCPeerConnection();
      const dc = lc.createDataChannel("channel");

      dc.onmessage = (e) => {
        console.log("msg from B" + e.data);
        setChats((prevChats) => {
          console.log("prvchats", prevChats);
          return [...prevChats, { content: e.data }];
        });
        // setChats([...chats,e.data])
      };
      dc.onopen = (e) => {
        console.log("connection opened!");
        setConnectionOpened(true);
      };

      lc.onicecandidate = async (e) => {
        // if (e.candidate) {
        //   // Candidate is available, call addRTCUserInfo
        //   console.log("with_email let's fetch user",with_email)
        //   const to_user_id = await fetchUserId(token,with_email)
        //   console.log("whatisthisto_user_id",to_user_id)
        //   addRTCUserInfo(true, JSON.stringify(lc.localDescription),to_user_id);
        //   // console.log("Notice how many times it's being called...", JSON.stringify(lc.localDescription));
        // }

        if (e.candidate) {
          // Candidate is available, but don't save it yet
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
          // ICE gathering is complete, save the final ICE candidate to the database
          console.log("ICE gathering is complete");
          const to_user_id = await fetchUserId(token, with_email);
          console.log(
            "Final ICE candidate:",
            JSON.stringify(lc.localDescription)
          );
          addRTCUserInfo(true, JSON.stringify(lc.localDescription), to_user_id);
        }
      };

      lc.createOffer()
        .then((o) => lc.setLocalDescription(o))
        .then((a) => console.log("offer set successfully!"));
      return [dc, lc];
    } else if (type === "RESPONDER") {
      console.log("Ensure it's not called multiple times...");
      const offer_str = await fetchRTCOffer();
      console.log("offer_str", offer_str, typeof offer_str);
      const offer = JSON.parse(offer_str["sdp"]);
      // console.log("here is your offer love",offer,typeof(offer))
      const rc = new RTCPeerConnection();

      rc.onicecandidate = async (e) => {
        if (e.candidate) {
          console.log("herei s the ans" + JSON.stringify(rc.localDescription));
          const to_user_id = await fetchUserId(token, with_email);

          saveRTCUserAns(
            false,
            JSON.stringify(rc.localDescription),
            to_user_id
          );
        }
      };

      rc.ondatachannel = (e) => {
        rc.dc = e.channel;

        rc.dc.onmessage = (e) => {
          // setChats(prv_chat=>[...prv_chat,e.data])
          if (e.data) {
            // const old_chats = JSON.parse(JSON.stringify(chats))
            // console.log("old_chats",old_chats)
            // setChats([...old_chats,e.data])
            setChats((prevChats) => {
              console.log("prvchats", prevChats);
              return [...prevChats, { content: e.data }];
            });

            console.log("new message from client A!!", e.data);
          }
        };

        rc.dc.onopen = (e) => {
          setConnectionOpened(true);
          console.log("connection opened!");
        };
      };

      rc.setRemoteDescription(offer).then((a) => console.log("offerset"));

      rc.createAnswer()
        .then((a) => rc.setLocalDescription(a))
        .then((a) => console.log("answer created"));
      return [rc, null];
    }
  };
  useEffect(async () => {
    console.log("AREEWREWHERE");
    const fetchRequestStatus = async () => {
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        // const we = 'deepaksingh.18feb%40gmail.com'
        console.log("WHERE  IS withemail", with_email);
        const response = await fetch(
          `http://127.0.0.1:8000/api/handle_request?to_email=${with_email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          return data;
          // setRequestStatus(data.status);
        } else {
          console.log("Error fetching request status");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    const req_status = await fetchRequestStatus();
    console.log("hererewis req_status", req_status.status);
    setRequestStatus(req_status.status);
    if (req_status.status === "ACCEPTED") {
      console.log("SHOUDL IT BE ACCEPTED FRO BOTH");

      console.log("make call to check if we can get the RTC Entry", req_status);
      const rtc_entry = await fetchRTCUserInfo();
      const intervalId = setInterval(() => {
        fetchRTCUserInfo(); // Fetch data every 10 seconds
      }, 10000);
      setIntervalId(intervalId);
      console.log("rtc_entry mayn eed more checks", rtc_entry);
      if (rtc_entry === null) {
        const [dc, lc] = await initializeNRespondWebRTC(token, "INITIATOR");
        console.log("dowehave dc", dc);
        if (dc) {
          console.log("myRef's current value:", myRef.current);
          myRef.current = {
            type: "INITIATOR",
            channel: dc,
            lc: lc,
          };
          // myRef.current = 'updated Value';
        }
      } else if (rtc_entry.answer === null && rtc_entry.sdp != null) {
        console.log("here is rtc_entry", rtc_entry);

        const [rc, lc] = await initializeNRespondWebRTC(token, "RESPONDER");
        console.log("dowehave rc", rc);

        if (rc) {
          myRef.current = {
            type: "RESPONDER",
            channel: rc,
          };
        }
      }
    }
  }, [with_email]);

  const sendMsg = (msg) => {
    console.log("here is the msg", msg, myRef.current["type"]);
    setChats((prevChats) => {
      console.log("prvchats", prevChats);
      return [...prevChats, { content: msg, who: "ME" }];
    });
    if (myRef.current["type"] === "INITIATOR") {
      myRef.current.channel.send(msg);
    } else {
      myRef.current.channel.dc.send(msg);
    }

    // myRef.current['type']==="INITIATOR"
  };
  useEffect(() => {
    if (answer) {
      if (myRef.current["type"] === "INITIATOR") {
        const answer = JSON.parse(myRef.current.answer);
        myRef.current.lc.setRemoteDescription(answer);
        console.log("should clear right after this", intervalId);
      }
    }
  }, [answer]);

  useEffect(() => {
    if (connection_open) {
      clearInterval(intervalId);
    }
  }, [connection_open]);

  return (
    <div
      style={{
        // border: "1px solid blue",
        // height: "600px",
        // // width: "700px",
        // background: "rgb(221, 237, 240,0.2)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "white",
      }}
    >
      {requestStatus ? (
        <ChatScreenWithInfo
          requestStatus={requestStatus}
          connection_open={connection_open}
          with_email={with_email}
          chats={chats}
          sendMsg={sendMsg}
        />
      ) : (
        <div>loadding...</div>
      )}
    </div>
  );
}
