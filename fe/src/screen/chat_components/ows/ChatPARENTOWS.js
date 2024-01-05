import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import UserChatTileInListCOWs from "./UserChatTileInListCOWS";

import ChatsEditor from "./ChatsEditor";

export default function ChatPARENTOWS() {
  // State for storing online profiles

  const [onlineProfiles, setOnlineProfiles] = useState(null);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);

  console.log("ChatPARENTOWS parent of profiles and chats");
  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.10:8000", {
      query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOnlineProfiles = () => {
      console.log("fetching again");
      socket.emit("fetch_online_profiles");
    };

    fetchOnlineProfiles();

    const intervalId = setInterval(() => {
      console.log("Interval triggered");
      fetchOnlineProfiles();
    }, 10000);

    // Event listener for fetching online profiles
    socket.on("fetch_online_profiles", (data) => {
      if (data) {
        console.log("Data recdsfeived:", data, typeof data, onlineProfiles);
        const p_data = JSON.parse(data);

        setOnlineProfiles((prevOnlineProfiles) => {
          if (!prevOnlineProfiles) {
            console.log("this should only be running once", onlineProfiles);
            setOnlineProfiles(p_data);
            setLoading(false);
          } else if (
            prevOnlineProfiles &&
            p_data.length != prevOnlineProfiles.length
          ) {
            console.log("wehrewrnrer");
            setOnlineProfiles(p_data);
            setLoading(false);
          }
          return prevOnlineProfiles;
        });
      }
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Include socket in the dependency array

  const all_online_profiles = onlineProfiles && (
    <UserChatTileInListCOWs
      profiles={onlineProfiles}
      SetWithUserId={SetWithUserId}
      SetWithEmail={SetWithEmail}
    />
  );

  const chats_window = (
    <Paper>
      <>
        <Typography variant="h5" gutterBottom>
          with_userid - {with_userid} - {with_email}
        </Typography>
        {with_userid && <ChatsEditor with_userid={with_userid} />}
      </>
    </Paper>
  );

  console.log(
    "this should only be running once as of now as we are setting the state only once",
    onlineProfiles
  );
  return (
    <Grid container spacing={3}>
      {!with_userid && (
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20, maxHeight: "80vh", overflow: "auto" }}>
            <Typography variant="h5" gutterBottom>
              Online Profiles
            </Typography>
            {/* Show loader if onlineProfiles is null */}
            {loading && <CircularProgress />}
            {/* Show onlineProfiles if not null */}
            {!loading && all_online_profiles && (
              <Grid container spacing={2}>
                {all_online_profiles}
              </Grid>
            )}
          </Paper>
        </Grid>
      )}

      {with_userid && (
        <Grid container item xs={12} md={8}>
          {chats_window}
        </Grid>
      )}
    </Grid>
  );
}
