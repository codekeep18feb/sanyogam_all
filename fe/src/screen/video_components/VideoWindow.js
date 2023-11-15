import React, { useEffect, useState, useRef } from 'react';
import RequestScreen from "../RequestScreen";
import VideoScreen from "./VideoScreen";

export default function VideoWindow({ with_email,with_userid }) {
  // console.log("here we are", rtcData);
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [chats, setChats] = useState([]);
  const [requestStatus, setRequestStatus] = useState(null);
  const [answer, setAnswer] = useState(false)
  const myRef = useRef(null);
  
  const yourVideoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  const [connection_open, setConnectionOpened] = useState(false)
  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id/${with_userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // setRTCData(data);
        console.log("doesithaveboth?",data.answer,data.sdp)
        if (data && data.answer && data.sdp){
          console.log("bothexist")
          if (!answer){
            myRef.current = {
              ...myRef.current,
              "answer":data.answer

            }
            setAnswer(true)
          }

        }
        return Object.entries(data).length ==0 ? null : data
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const addRTCUserInfo = async (isInitiator, sdp,to_user) => {
    console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try { 
      const response = await fetch(`http://localhost:8000/api/add_rtc_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          "initiator": isInitiator,
          "sdp": sdp,
          "to_user":to_user
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const setStream = (es)=>{
    setVideoStream(es);

  }
  const saveRTCUserAns = async (isInitiator, sdp,to_user) => {
    console.log("save answer", isInitiator, sdp,to_user);
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/add_rtc_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          "initiator": isInitiator,
          "sdp": sdp,
          "to_user":to_user
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRTCOffer = async () => {
    // console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id/${with_userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
        return data
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserId = async (token,with_email)=>{

    // http://localhost:8000/api/users/query?q_email=deepaksingh.18feb%40gmail.com
    try {
      const response = await fetch(`http://localhost:8000/api/users/query?q_email=${with_email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully fetched user", data['id']);
        return data['id']
      } else {
        console.log('Error fetching chat history');
        return null
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  }
  const initializeWebRTC = async (token,type) => {
    if (type=="INITIATOR"){
      console.log("Ensure it's not called multiple times...")

      const lc = new RTCPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("doweseestream",stream)
      yourVideoRef.current.srcObject = stream
      // myRef.current = {"srcObject":stream};
      setStream(stream);
      lc.addStream(stream);
      lc.onaddstream = (event) => {
        console.log('ON LOCAL @ TRACK',event,event.stream,myRef.current)
        // myRef.current = {"srcObject":event.stream};
        // remoteVideoRef.current.srcObject = event.stream;
        yourVideoRef.current.srcObject = event.stream

        // setStream(event.stream)
        // setRemoteStream(event.stream);
      };
      // lc.onaddstream = (event) => {
      //   myRef.current = {"srcObject":event.stream};
      //   // remoteVideoRef.current.srcObject = event.stream;
      //   setStream(event.stream)
      //   // setRemoteStream(event.stream);
      // };

      lc.onicecandidate = async (e) => {
        if (e.candidate) {
          // Candidate is available, but don't save it yet
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
          // ICE gathering is complete, save the final ICE candidate to the database
          console.log("ICE gathering is complete");
          const to_user_id = await fetchUserId(token, with_email);
          console.log("Final ICE candidate:", JSON.stringify(lc.localDescription));
          addRTCUserInfo(true, JSON.stringify(lc.localDescription), to_user_id);
        }
      }
  
      lc.createOffer()
        .then((o) => lc.setLocalDescription(o))
        .then((a) => {
          console.log('offer set successfully!')
          console.log('Signaling State after setting local description:', lc.signalingState);

        });
      return [lc]
  

    }
    else if (type=="RESPONDER"){
      console.log("Ensure it's not called multiple times...")
      const offer_str = await fetchRTCOffer()
      console.log("offer_str",offer_str,typeof(offer_str))
      const offer = JSON.parse(offer_str['sdp'])
      // console.log("here is your offer Norm",offer,typeof(offer))
      const rc = new RTCPeerConnection()
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("doweseestream",stream)
      yourVideoRef.current.srcObject = stream
      // myRef.current = {"srcObject":stream};
      setStream(stream);
      rc.addStream(stream);
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("doweseestream",stream)
      // yourVideoRef.current.srcObject = stream
      // myRef.current = {"srcObject":stream};
      // setStream(stream);
      // rc.addStream(stream);
      rc.onaddstream = (event) => {
        console.log('ON REMOTE @ TRACK',event,event.stream,myRef.current)
        // myRef.current = {"srcObject":event.stream};
        // remoteVideoRef.current.srcObject = event.stream;
        yourVideoRef.current.srcObject = event.stream

        // setStream(event.stream)
        // setRemoteStream(event.stream);
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
          console.log("herei s the ans" + JSON.stringify(rc.localDescription))
          const to_user_id = await fetchUserId(token,with_email)

          saveRTCUserAns(false,JSON.stringify(rc.localDescription),to_user_id)

        }
        
      }

      

          



      rc.setRemoteDescription(offer).then(a=>{
        console.log("set remoteDescription with local offer")
        console.log('Signaling State after setting remoteDescription', rc.signalingState);

      })



      rc.createAnswer().then(a => {
        rc.setLocalDescription(a)
        console.log('Signaling State after setting Local description set as a provisional answer.:', rc.signalingState);

      }).then(a=>{
        console.log("answer created")
        console.log('Signaling State after setting Local description set as a provisional answer.:', rc.signalingState);

      })
      return [rc]
    }
    
  };
  console.log("chatsdfdsfas",chats)
  // const respondeWebRTC = () => {
  //   // Implement your response logic here
  // }
 

  useEffect(async() => {
    fetchRTCUserInfo(); // Fetch data initially
    // console.log("main useeffect ran")

    const intervalId = setInterval(() => {
      fetchRTCUserInfo(); // Fetch data every 10 seconds
    }, 10000);

    // console.log("myRef's current value:", myRef.current);
    // myRef.current = 'updated Value';
    // console.log("myRef's updated value:", myRef.current);

    const fetchChatHistory = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://localhost:8000/api/chathistory/${with_email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setChatHistory(data);
        } else {
          console.log('Error fetching chat history');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRequestStatus = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://localhost:8000/api/request_info/${with_email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          return data
          // setRequestStatus(data.status);
        } else {
          console.log('Error fetching request status');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchChatHistory();
    // console.log("can we decide whatnow",rtcData,rtcData != null && Object.entries(rtcData).length === 0)
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;
    // if (rtcData != null && Object.entries(rtcData).length === 0) {
    //   console.log("don't tell we are giong through this?")
    //   initializeWebRTC(token);
    // } else if (rtcData != null && Object.entries(rtcData).length > 0) {
    //   console.log(("arewehereyet"))
    //   respondeWebRTC(token);
    // }

    const req_status = await fetchRequestStatus();
    if(req_status.status=="ACCEPTED"){
      console.log("make call to check if we can get the RTC Entry",req_status)
      const rtc_entry = await fetchRTCUserInfo()
      console.log("rtc_entry mayn eed more checks",rtc_entry)
      if (rtc_entry==null){
        
        const [lc] = await initializeWebRTC(token,"INITIATOR")
        // console.log("dowehave dc",dc)
        if (lc){
          console.log(lc,"myRef's current value:", myRef.current);
          myRef.current = {
            "type":"INITIATOR",
            "channel":lc,
            // "lc":lc
          }

          
          // myRef.current = 'updated Value';
          
        }


      }
      else if (rtc_entry.answer==null && rtc_entry.sdp!=null){
        console.log("here is rtc_entry",rtc_entry)

        const [rc] = await initializeWebRTC(token,"RESPONDER")
        console.log("dowehave rc",rc)

        if (rc){
          myRef.current ={ 
            "type":"RESPONDER",
            "channel":rc
          }
        }

      }
      myRef.current.channel.addEventListener('iceconnectionstatechange', () => {
            console.log('ICE Connection State changed:', myRef.current.channel.iceConnectionState);
            
            // if (myRef.current.channel.iceConnectionState === 'connected') {
            //   // ICE connection is fully established
            //   setConnectionOpened(true);
            // }
          });
        
      myRef.current.channel.addEventListener('connectionstatechange', () => {
        console.log('Connection State changed:', myRef.current.channel.connectionState);
      
        // if (myRef.current.channel.connectionState === 'connected') {
        //   // Connection is fully established
        //   setConnectionOpened(true);
        // }
      });

      myRef.current.channel.addEventListener('signalingstatechange', () => {
        console.log('AREWHEREWREVER')
        console.log(typeof(myRef.current.channel),myRef.current.channel,'Signaling State changed:', myRef.current.channel.signalingState, myRef.current.channel.iceConnectionState, myRef.current.channel.connectionState);
        if (myRef.current.channel.signalingState === 'stable') {
          setConnectionOpened(true);
        }
      });

      console.log("myRef's updated value:", myRef.current);

    }
  }, [with_email]);



  useEffect(() => {
    if(answer){
      console.log("HEREISWHATWEHAVE")
      console.log("if INITIATOR I THING WE CAN INITIATE THE CONNECTION??,",myRef.current,myRef.current['type']=="INITIATOR")
      if (myRef.current['type']=="INITIATOR"){
        // let's perform the thrid step
        console.log("hereAnswer",myRef.current,myRef.current.answer,typeof(myRef.current.answer))//myRef.current.send("douseeme!")
        const answer = JSON.parse(myRef.current.answer)
        console.log("DOWESEE ANSWER",answer)
        // myRef.current.channel.send("douseeme!")
        // answer = answer
        console.log('Signaling State before setting remote description:', myRef.current.channel.signalingState);

        

        myRef.current.channel.setRemoteDescription(answer).then((a)=>{
          
          console.log('dowseseethantythere')
          console.log('Signaling State after setting answer on setRemoteDescription:', myRef.current.channel.signalingState);
          
        })
        .catch((error) => {
          console.error('Error setting remote description:', error);
        });
     
      }
      

    }
  }, [answer])

 
  console.log("answerishere",answer)
  useEffect(() => {
    if(connection_open){
      console.log("connectionopened",connection_open)

    }
  }, [connection_open])
  

  console.log("hereis",myRef.current)
  return (

    <div>

      {JSON.stringify(connection_open)}
      <video
        ref={yourVideoRef} // Add a ref to the video element
        autoPlay
        playsInline
        muted // You may want to remove this if it's not the local video
        // Add other attributes such as width, height, etc.
      ></video>

     </div>
    
  );
}
