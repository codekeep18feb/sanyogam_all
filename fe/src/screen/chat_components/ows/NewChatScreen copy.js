import { Grid } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

export default function NewChatScreen({ chats, to_email }) {
  const [textareaValue, setTextareaValue] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.2:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );

  // const sendMessage = () => {
  //   // const prefix = selectedPrefix || 'AC'; // Use 'AC' as the default prefix
  //   const message =textareaValue;
  //   console.log('werewehere 3nd time')
  //   //instead let's just make an api call
  //   // socket.emit('custom_event', message);
  //   setTextareaValue('');
  // };

  const sendMsgApi = async (payload, to_email) => {
    console.log("am I being payload", payload);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.2:8000/api/send_msg/${to_email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ msg: payload }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully sent msg", data);
      } else {
        console.log("Error sending msg");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      console.log("we can toggle loading if want");
      // setLoading(false);
    }
  };

  const handleSendMessage = async (to_email) => {
    if (textareaValue.trim() === "") {
      return; // Don't send empty messages
    } else {
      console.log("here istextareaValue", textareaValue);
      // sendMessage(textareaValue)
      const data = await sendMsgApi(textareaValue, to_email);
      console.log("herer sendmsgs", data);
      if (data) {
        setTextareaValue("");
      }
    }

    // Prepare the request body
    const requestBody = {
      msg: textareaValue,
    };

    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    // Update the UI to indicate sending
    setSendingMessage(true);
  };

  return (
    <div>
      <div style={{ display: "flex", "flex-direction": "column" }}>
        <div style={{ "flex-grow": 1, "background-color": "lightblue" }}>
          {chats &&
            chats.map((chat, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  color:
                    Object.keys("who") && chat.who !== "ME" ? "green" : "grey",
                  textAlign:
                    Object.keys("who") && chat.who === "ME" ? "left" : "right",
                  fontStyle: "italic",
                  fontSize: "19px",
                }}
              >
                {chat.msg}
              </div>
            ))}
        </div>
      </div>
      <div>
        <Grid container justifyContent={"space-around"}>
          <Grid item xs={8}>
            <textarea
              style={{
                width: "100%",
                borderRadius: "20px",
                textAlign: "center", // Center-align the placeholder text
              }}
              placeholder="Type something..."
              value={textareaValue}
              onChange={handleTextareaChange}
              disabled={sendingMessage} // Disable textarea while sending
            />
            <SendIcon
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(to_email);
                }
              }}
              onClick={() => {
                handleSendMessage(to_email);
              }}
              disabled={sendingMessage}
              style={{ fontSize: "35px", color: "#1F4294" }}
            />
          </Grid>
          {/* <Grid item xs={2}>

            <SendIcon
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(to_email);
                }
              }}
              
              onClick={() => {
                handleSendMessage(to_email)
              }
              }
              disabled={sendingMessage} 
              style={{ fontSize: "35px", color: "#1F4294" }}
              />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
