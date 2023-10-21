import React, { useEffect, useState,useRef } from 'react';
import { connect } from 'react-redux';
import TabPanel from '../TabPanel';
import Grid from '@mui/material/Grid'; // Import Grid
// import BlankChatScreen from './BlankChatScreen';



const imageStyle = {
  backgroundImage: `url('https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg')`,
  backgroundSize: '200px 200px', // Set the image size to 200x200
  backgroundPosition: 'center', // Center the image horizontally
  display: 'flex',
  alignItems: 'center', // Center the image vertically
  height: '600px',
  backgroundRepeat: 'no-repeat', // Turn off background image repeat
  border:"1px solid grey",
  width: '700px',
};

export function BlankChatScreen() {
  return (
    <div style={imageStyle}>
      {/* Your content goes here */}
    </div>
  );
}


export function ChatScreen({ chats, to_email,sendMsg }) {
  const [textareaValue, setTextareaValue] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (textareaValue.trim() === '') {
      return; // Don't send empty messages
    }
    else{
      sendMsg(textareaValue)
      setTextareaValue('')
    }

    // Prepare the request body
    const requestBody = {
      content: textareaValue,
    };

    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    // Update the UI to indicate sending
    setSendingMessage(true);

    try {
      const response = await fetch(`http://localhost:8000/api/send_msg/${to_email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Message sent successfully
        console.log('Message sent successfully');
        setTextareaValue(''); // Clear the textarea after sending
      } else {
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      // Reset the UI after sending
      setSendingMessage(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", "flex-direction": "column", height: "550px" }}>
        <div style={{ "flex-grow": 1, "background-color": "lightblue" }}>
          {chats.map((chat, index) => (
            <div key={index} 
            
            style={{ padding: "10px", color: Object.keys("who") && chat.who !== "ME" ? "green" : "grey", textAlign: Object.keys("who") && chat.who === "ME" ? "left" : "right", fontStyle: "italic", fontSize: "19px" }}
            
            >
              {chat.content}
            </div>
          ))}
        </div>
      </div>
      <div>
        <textarea
          style={{ width: "500px" }}
          placeholder="Type something..."
          value={textareaValue}
          onChange={handleTextareaChange}
          disabled={sendingMessage} // Disable textarea while sending
        />
        <button onClick={handleSendMessage} disabled={sendingMessage}>
          Send
          {/* {sendingMessage ? 'Sending...' : 'Send'} */}
        </button>
      </div>
    </div>
  );
}

function ChatWindow({ with_email, with_userid }) {
  // console.log("here we are", rtcData);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [requestStatus, setRequestStatus] = useState(null);
  const [answer, setAnswer] = useState(false);
  const myRef = useRef(null);
  const [connection_open, setConnectionOpened] = useState(false);

  const sendMsg = (msg) => {
    console.log("here is the msg", msg, myRef.current["type"]);
    setChats((prevChats) => {
      console.log("prvchats", prevChats);
      return [...prevChats, { content: msg, who: "ME" }];
    });
    if (myRef.current["type"] == "INITIATOR") {
      myRef.current.channel.send(msg);
    } else {
      myRef.current.channel.dc.send(msg);
    }

    // myRef.current['type']=="INITIATOR"
  };

  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://localhost:8000/api/rtc_user_info_by_id/${with_userid}`,
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
        return Object.entries(data).length == 0 ? null : data;
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
      const response = await fetch(`http://localhost:8000/api/add_rtc_user`, {
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
      });

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
      const response = await fetch(`http://localhost:8000/api/add_rtc_user`, {
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
      });

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
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://localhost:8000/api/rtc_user_info_by_id/${with_userid}`,
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
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/query?q_email=${with_email}`,
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
  const initializeWebRTC = async (token, type) => {
    if (type == "INITIATOR") {
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
        if (e.candidate) {
          console.log("ICE candidate available");
        } else if (lc.iceGatheringState === "complete") {
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
    } else if (type == "RESPONDER") {
      console.log("Ensure it's not called multiple times...");
      const offer_str = await fetchRTCOffer();
      console.log("offer_str", offer_str, typeof offer_str);
      const offer = JSON.parse(offer_str["sdp"]);

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
          if (e.data) {
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
  console.log("chatsdfdsfas", chats);

  useEffect(async () => {
    fetchRTCUserInfo();

    const intervalId = setInterval(() => {
      fetchRTCUserInfo();
    }, 10000);

    const fetchRequestStatus = async () => {
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(
          `http://localhost:8000/api/request_info/${with_email}`,
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
    if (req_status.status == "ACCEPTED") {
      console.log("make call to check if we can get the RTC Entry", req_status);
      const rtc_entry = await fetchRTCUserInfo();
      console.log("rtc_entry mayn eed more checks", rtc_entry);
      if (rtc_entry == null) {
        const [dc, lc] = await initializeWebRTC(token, "INITIATOR");
        console.log("dowehave dc", dc);
        if (dc) {
          console.log("myRef's current value:", myRef.current);
          myRef.current = {
            type: "INITIATOR",
            channel: dc,
            lc: lc,
          };
        }
      } else if (rtc_entry.answer == null && rtc_entry.sdp != null) {
        console.log("here is rtc_entry", rtc_entry);

        const [rc, lc] = await initializeWebRTC(token, "RESPONDER");
        console.log("dowehave rc", rc);

        if (rc) {
          myRef.current = {
            type: "RESPONDER",
            channel: rc,
          };
        }
      }
      console.log("myRef's updated value:", myRef.current);
    }
  }, [with_email]);

  
  useEffect(() => {
    if (answer) {
      console.log("HEREISWHATWEHAVE");
      console.log(
        "if INITIATOR I THING WE CAN INITIATE THE CONNECTION??,",
        myRef.current,
        myRef.current["type"] == "INITIATOR"
      );
      if (myRef.current["type"] == "INITIATOR") {
        // let's perform the thrid step
        console.log(
          "hereAnswer",
          myRef.current,
          myRef.current.answer,
          typeof myRef.current.answer
        ); //myRef.current.dc.send("douseeme!")
        const answer = JSON.parse(myRef.current.answer);
        console.log("DOWESEE ANSWER", answer);
        // myRef.current.channel.send("douseeme!")
        // answer = answer
        myRef.current.lc.setRemoteDescription(answer);
        // let i=0
        // const intervalId = setInterval(() => {
        //   i+=1
        //   console.log('douseeme!!!',i)
        //   myRef.current.channel.send(`msg from A-${i}`)

        // }, 10000);
      }
    }
  }, [answer]);

  return (
    <div
      style={{
        border: "1px solid blue",
        height: "600px",
        width: "700px",
        background: "rgb(221, 237, 240,0.2)",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : connection_open ? (
        <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
      ) : requestStatus !== "ACCEPTED" ? (
        // <RequestScreen with_email={with_email} />
        <div>REQUST STatus</div>
      ) : (
        <div>Nothing Matched!</div>
      )}
    </div>
  );
}





function Chat({auth_data}) {
  const [profiles, setProfiles] = useState([]);
  const [online_profiles, setOnlineProfiles] = useState([]);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rtcData, setRTCData] = useState(null);

  const users = [
    { id: 1, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 2, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 3, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 4, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 5, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 6, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 7, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 8, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 9, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 10, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 11, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 12, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 13, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 14, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 15, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 16, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 17, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 18, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 19, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg', online: true },
    { id: 20, imageUrl: 'https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg', online: false },
    // Add more user objects as needed
  ];

  // console.log("is it rerendering.?? mutiple times",rtcData)
  const fetchData = async () => {
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch('http://localhost:8000/api/read_online_circle', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        setOnlineProfiles(data);
        // setLoading(false);
      } else {
        console.log('Error occurred while fetching profiles.');
        // setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // setLoading(false);
    }
  };

  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // setRTCData(data);
        console.log("datsdafsdaa",data)
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async() => {
    fetchData(); // Fetch data initially
    // console.log("main useeffect ran")

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);

    
    // Fetch data from the /api/profiles endpoint
    const JWT_TOKEN = localStorage.getItem('token')
    const token = `Bearer ${JWT_TOKEN}`
    console.log("token",token)
    const response2 = await fetch('http://localhost:8000/api/profiles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your JWT token
      },
    });

    if (response2.status === 200) {
      const data = await response2.json();
      console.log("data",data)
      setProfiles(data);
      setLoading(false);
      // fetchRTCUserInfo()

      
    } else {
      console.log('error occured!')
      // setError('Peopleissu');
        setLoading(false);

    }


  }, [with_userid]);



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Grid container>
     
      <Grid item xs={12} md={3}>
        <TabPanel profiles={profiles} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} with_userid={with_userid} />
        
      </Grid>

      <Grid item xs={12} md={7}>
      
      <div>
          {with_userid ? <ChatWindow with_email={with_email} with_userid={with_userid} /> : <BlankChatScreen />}
        </div>  
      </Grid>

      
    </Grid>
    </div>

  );

}

const mapStateToProps = (state) => {
  console.log("grab auth outof it",state.auth.data)
  return {
  
    auth_data:state.auth.data // Assuming you have a reducer that manages a "count" property
  }
};


// export default Chat;
export default connect(mapStateToProps, null)(Chat);;
