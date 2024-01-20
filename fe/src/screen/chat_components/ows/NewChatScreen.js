import { Grid } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

export default function NewChatScreen({ chats, to_userid }) {
  const [textareaValue, setTextareaValue] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const sendMsgApi = async (payload, to_userid) => {
    console.log("am I being payload", payload);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/send_msg/${to_userid}`,
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

  const handleSendMessage = async (to_userid) => {
    if (textareaValue.trim() === "") {
      return; // Don't send empty messages
    } else {
      console.log("here istextareaValue", textareaValue);
      // sendMessage(textareaValue)
      const data = await sendMsgApi(textareaValue, to_userid);
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
    // <div  style={{border:"1px solid green",width:"100%",marginTop:"10px"}}>
    <Grid container style={{ height: "100vh" }} alignItems={"center"}>
      <Grid item xs={10} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            overflowY: "scroll",
          }}
        >
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
      </Grid>
      <Grid
        xs={10}
        container
        flexDirection={"row"}
        spacing={2}
        justifyContent={"center"}
      >
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
        </Grid>
        <Grid item xs={2}>
          <SendIcon
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(to_userid);
              }
            }}
            onClick={() => {
              handleSendMessage(to_userid);
            }}
            disabled={sendingMessage}
            style={{ fontSize: "35px", color: "#1F4294" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
