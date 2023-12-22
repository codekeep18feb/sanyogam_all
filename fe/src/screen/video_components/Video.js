import React, { useEffect, useState } from "react";
import UserChatTileInListC from "../UserChatTileInListC";
import VideoWindow from "./VideoWindow";
import { connect } from "react-redux";

function Video({ auth_data }) {
  const [profiles, setProfiles] = useState([]);
  const [online_profiles, setOnlineProfiles] = useState([]);
  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rtcData, setRTCData] = useState(null);


 

  useEffect(async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    console.log("token", token);
    const response2 = await fetch("http://192.168.1.13:8000/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Replace with your JWT token
      },
      body:JSON.stringify({})
    });

    if (response2.status === 200) {
      const data = await response2.json();
      console.log("data", data);
      setProfiles(data);
      setLoading(false);
      // fetchRTCUserInfo()
    } else {
      console.log("error occured!");
      // setError('Peopleissu');
      setLoading(false);
    }
  }, [with_userid]);

  useEffect(() => {
     console.log("new online profiles arrived", online_profiles, profiles);

    // Check if online_profiles has items and is not empty
    if (online_profiles.length > 0) {
      // Create a set of online email addresses for faster lookup
      const onlineEmailsSet = new Set(online_profiles);

      // Update the online status in profiles using setProfiles
      const updatedProfiles = profiles.map((profile) => {
        if (onlineEmailsSet.has(profile.user_email)) {
          return { ...profile, online: true };
        } else {
          return { ...profile, online: false };
        }
      });
      console.log("updatedProfiles are they not changnin", updatedProfiles);
      // Set the updated profiles
      setProfiles(updatedProfiles);
    }
  }, [online_profiles]);

  if (loading) {
    return <p>oading...</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <UserChatTileInListC
          profiles={profiles}
          SetWithUserId={SetWithUserId}
          SetWithEmail={SetWithEmail}
          with_userid={with_userid}
        />
      </div>
      <div>
        {with_userid ? (
          <VideoWindow with_email={with_email} with_userid={with_userid} />
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("grab auth outof it", state.auth.data);
  return {
    auth_data: state.auth.data, // Assuming you have a reducer that manages a "count" property
  };
};

// export default Video;
export default connect(mapStateToProps, null)(Video);