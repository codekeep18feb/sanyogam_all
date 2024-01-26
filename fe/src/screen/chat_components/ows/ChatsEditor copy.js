import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Grid, CircularProgress, Button } from "@mui/material";
import NewChatScreen from "./NewChatScreen";
import VideoOWS from "./VideoOWS";
const SocketWrapperFetchProfiles = ({
  with_userid,
  handleFetchedData,
  children,
}) => {
  const [socket, setSocket] = useState(
    io.connect("http://192.168.150.32:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnlineProfiles = () => {
      socket.emit("fetch_profile_chats");
    };

    fetchOnlineProfiles();

    const intervalId = setInterval(() => {
      fetchOnlineProfiles();
    }, 100000000);

    const handleFetchProfileChats = (data) => {
      if (data) {
        const pdata = JSON.parse(data);
        const f_data = pdata.filter(
          (i) => i.frm_user === with_userid || i.to_user === with_userid
        );
        handleFetchedData(f_data);
        setLoading(false);
      }
    };

    socket.on("fetch_profile_chats", handleFetchProfileChats);

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      clearInterval(intervalId);
      socket.off("fetch_profile_chats", handleFetchProfileChats);
    };
  }, [socket, with_userid, handleFetchedData]);

  return <>{children}</>;
};

const ChatsEditor = ({ with_email, with_userid }) => {
  const [allChats, setAllChats] = useState(null);
  const [videoChat, setvideoChat] = useState(false);

  const handleFetchedData = (data) => {
    setAllChats(data);
  };

  return (
    <SocketWrapperFetchProfiles
      with_userid={with_userid}
      handleFetchedData={handleFetchedData}
    >
      <div>
        <div>all chats</div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setvideoChat(true);
          }}
        >
          Video Chat
        </Button>
        {!with_userid && <CircularProgress />}
        {with_userid && !videoChat && (
          <Grid container spacing={2}>
            {allChats && (
              <div style={{ marginTop: "10px" }}>
                <NewChatScreen chats={allChats} sendMsg={() => {}} />
              </div>
            )}
          </Grid>
        )}
        {with_userid && with_email && videoChat && (
          <VideoOWS with_userid={with_userid} with_email={with_email} />
        )}
      </div>
    </SocketWrapperFetchProfiles>
  );
};

export default ChatsEditor;
