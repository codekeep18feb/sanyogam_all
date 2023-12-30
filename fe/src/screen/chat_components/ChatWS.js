import React, { useEffect, useState } from "react";
import UserChatTileInListC from "../UserChatTileInListC";
import ChatWindowWS from "./ChatWindowWS";
import { connect } from "react-redux";
import TabPanel from "../TabPanel";
import Grid from "@mui/material/Grid"; // Import Grid
import Hidden from "@mui/material/Hidden"; // Import Hidden
import ImageCircles from "./ImageCircle";
import BlankChatScreen from "./BlankChatScreen";
import ChatModal from "../../screen/ChatModal";
import io from "socket.io-client";

function ChatWS({ auth_data }) {
  const [socket, setSocket] = useState(
    io.connect("http://192.168.1.2:8000", {
      query: { token: `Bearer ${localStorage.getItem("token")}` },
    })
  );
  // const [socket, setSocket] = useState(io.connect('http://192.168.1.2:8000'));
  const [soc_conn, setsoc_conn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [profiles, setProfiles] = useState([]);
  const [online_profiles, setOnlineProfiles] = useState([]);

  const [with_userid, SetWithUserId] = useState(null);
  const [with_email, SetWithEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rtcData, setRTCData] = useState(null);
  console.log("DOWE HAVE ANY", with_userid, with_email);
  const users = [
    {
      id: 1,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 2,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 3,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 4,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 5,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 6,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 7,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 8,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 9,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 10,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 11,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 12,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 13,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 14,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 15,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 16,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 17,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 18,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 19,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
      online: true,
    },
    {
      id: 20,
      imageUrl:
        "https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg",
      online: false,
    },
    // Add more user objects as needed
  ];

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("isther any data arrival", data, typeof data);
      // setsoc_conn('stage1')
    });

    return () => {
      // socket.disconnect();
      console.log("will it only run if unmounting is happening");
    };
  }, []);

  // console.log("is it rerendering.?? mutiple times",rtcData)
  const fetchData = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        "http://192.168.1.2:8000/api/read_online_circle",
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

        setOnlineProfiles(data);
        // setLoading(false);
      } else {
        console.log("Error occurred while fetching profiles.");
        // setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // setLoading(false);
    }
  };

  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(
        `http://192.168.1.2:8000/api/rtc_user_info_by_id`,
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
        console.log("datsdafsdaa", data);
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    // fetchData(); // Fetch data initially
    // console.log("main useeffect ran")

    // const intervalId = setInterval(() => {
    //   fetchData(); // Fetch data every 10 seconds
    // }, 10000);

    // Fetch data from the /api/profiles endpoint
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    console.log("token", token);
    const response2 = await fetch("http://192.168.1.2:8000/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Replace with your JWT token
      },
      body: JSON.stringify({}),
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
    // console.log("new online profiles arrived",online_profiles)
    // here will make the changes to profiles's online state
    // if online_profiles has items and not just empty
    // in that case let's create two arrays
    // offline_profiles -> items of profiles where email is not in online_profiles
    // online_profiles -> items of profiles where email is in online_profiles
    //now let's loop through these two arrays offline_profiles and online_profiles and update the online status in profiles using setProfiles

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
    return <p>Loang...</p>;
  }

  console.log("HERQEWR", isModalOpen);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3}>
          <TabPanel
            profiles={profiles}
            SetWithUserId={SetWithUserId}
            SetWithEmail={SetWithEmail}
            with_userid={with_userid}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <div>
            {with_userid ? (
              // <ChatModal with_userid={with_userid} SetWithUserId={SetWithUserId} with_email={with_email}/>

              <ChatWindowWS
                soc_conn={soc_conn}
                SetWithUserId={SetWithUserId}
                SetWithEmail={SetWithEmail}
                with_email={with_email}
                with_userid={with_userid}
              />
            ) : (
              // <div>Let This Div cover entire visible screen and have a cancel material icon to close this div if pressed</div>
              <BlankChatScreen />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("grab auth outof it", state.auth.data);
  return {
    auth_data: state.auth.data, // Assuming you have a reducer that manages a "count" property
  };
};

// export default ChatWS;
export default connect(mapStateToProps, null)(ChatWS);
