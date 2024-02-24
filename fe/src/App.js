import React from "react";
// import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from "./must/material_ux_examples/MaterialUIExample.js";
import { connect, useDispatch, useSelector } from "react-redux";
import AdvancedMaterialUIExample from "./must/material_ux_examples/AdvancedMaterialUIExample.js";
import Pricing from "./must/pricing_route/Pricing.js";
import TabPanel from "./must/material_ux_examples/TabPanel.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { login, logout } from "./redux/counter/AuthAction";

import { setIncomingCall } from "./redux/counter/GlobalAction";

// Import your components
import HomeScreen from "./must/homeroute/HomeScreen.js";
// import Login from './screen/LoginScreen.js';
// import Chat from "./screen/chat_components/Chat";
import SignupScreen from "./must/signup_route/SignupScreen.js";
// import HeaderDesktop from "./screen/HeaderDesktop.js"
// import Video from "./screen/video_components/Video.js";
import ModalDialog from "./must/material_ux_examples/ModalDialog.js";
import SnackbarExample from "./must/material_ux_examples/SnackbarExample.js";
import ItemList from "./must/material_ux_examples/ItemList.js";
import StepperExample from "./must/material_ux_examples/StepperExample.js";
import AccordionExample from "./must/material_ux_examples/AccordionExample.js";
import TooltipExample from "./must/material_ux_examples/TooltipExample.js";
import SnackbarWithActions from "./must/material_ux_examples/SnackbarWithActions.js";
// import DummyLogin from './practice/DummyLogin'
import LoginScreen from "./must/login_route/LoginScreen.js";
// import Footer from './screen/Footer'
import FAQ from "./must/faq/FAQ.js";
import GoogleAuthorize from "./must/google_authrized_route/GoogleAuthorize.js";
// import PaymentForm from './screen/PaymentForm'
import { useEffect, useState } from "react";
// import { useState } from 'react'
// import HeaderMobile from './screen/HeaderMobile.js'
// import InboxPractice from './screen/InboxPractice.js'
import BackTile from "./must/back_tile_route/BackTile.js";
import WrapperMobileShell from "./must/homeroute/WrapperMobileShell.js";
import WrapperMobileBackShell from "./must/back_tile_route/WrapperMobileBackShell.js";

import EditFamily from "./must/edit_family_route/EditFamily.js";


import PreviewProfile from "./must/back_tile_route/PreviewProfile.js";
import Home from "./must/homeroute/Home.js";
// import ChatWS from "./screen/chat_components/ChatWS.js";
import ChatPARENTOWS from "./must/chat_ows_route/ChatPARENTOWS.js";
import IncomingCallUI from "./must/incomingcallui_route/IncomingCallUI.js";
import LoggedinHome from "./must/homeroute/LoggedinHome.js";
// import ProfileBriefTile from './screen/ProfileBriefTile.js';
import AllUsers from "./must/all_users_route/AllUsers";
import ProfileDetail from "./must/all_users_route/ProfileDetail";
import Inbox from "./must/inbox_route/Inbox.js";

const MaterialUX = () => {
  return (
    <>
      <MaterialUIExample />
      <AdvancedMaterialUIExample />
      <TabPanel />
      <ModalDialog />
      <SnackbarExample />
      <ItemList />
      <StepperExample />
      <AccordionExample />
      <TooltipExample />
      <SnackbarWithActions />
    </>
  );
};

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  return localStorage.getItem("token") !== null;
}

const withGlobalSocket = (Component) => {
  // const JWT_TOKEN = localStorage.getItem("token");
  // const token = `Bearer ${JWT_TOKEN}`;

  return function WithSocketComponent({
    setIncomingCall,
    auth_data,
    login,
    logout,
    ...props
  }) {
    console.log(
      "did it rerendering now without me setting the data in sgam.db?",
      auth_data
    );
    const [socket, setSocket] = useState(
      io.connect("http://192.168.1.2:8001", {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    const [allGlobalData, setAllGlobalData] = useState({
      incoming_calls: [],
      notifications: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let intervalId;
      if (auth_data) {
        // const fetchGlobalEvents = () => {
        //   // const room = "hardcode";
        //   console.log("authherenow", auth_data, login);
        //   socket.emit("listen_global_events", auth_data.id);
        // };

        // fetchGlobalEvents();

        // intervalId = setInterval(() => {
        //   fetchGlobalEvents();
        // }, 1000);

        socket.on("listen_global_events", (data) => {
          if (data) {
            const p_data = JSON.parse(data);
            console.log(
              "my user id is ",
              auth_data.id,
              "will parse for incomming calls",
              p_data,
              typeof p_data
            );
            if (data) {
              if (auth_data.id == p_data["to_id"]) {
                console.log("arewqewrrewqr");
                setIncomingCall(data);
              }
            }
            // setAllGlobalData((prv) => {
            //   if ( JSON.stringify(prv_data) !==  JSON.stringify(data)) {
            //     return cs;
            //   }
            //   return prv;
            // });

            // const pdata = JSON.parse(data);
            // console.log("sdfasdf", pdata);
            // const f_data = pdata;
            // console.log('f_datahere',f_data)
            // console.log("dafsfasd", data.room);
            // if (data && Object.keys(data)) {
            //   const pdata = JSON.parse(data);

            //   // console.log("sdfasdafsadfdf", pdata);
            //   // const f_data = pdata; //.filter((i) => (i.frm_profile === with_userid));
            //   // console.log("f_datahere", pdata["incoming_calls"].length);
            //   const obj = {
            //     frm_id: data.initiator,
            //     to_id: data.responder,
            //     state: "incoming",
            //     sdp: data.sdp,
            //   };
            //   console.log("let me see if it's alrightight")
            //   // setIncomingCall(obj);
            // }

            // here i just want to setAllGlobalData if pdata["incoming_calls"].length!= pr
            // setAllGlobalData((prevChats) => {
            //   const cp_prv_chats = JSON.parse(JSON.stringify(prevChats))
            //   if (!prevChats["incoming_calls"].length) {
            //     setAllGlobalData(cp_prv_chats);
            //     // setLoading(false);
            //   }
            //   // else if (prevChats && f_data.length !== prevChats.length) {
            //   //   setAllChats(f_data);
            //   //   // setLoading(false);
            //   //}
            //   return prevChats;
            // });

            // if ("incoming_calls" in pdata) {
            //   console.log("incoming_calls yessdfsdf", pdata["incoming_calls"]);
            //   const obj = {
            //     frm_id: pdata["incoming_calls"][0].initiator,
            //     to_id: pdata["incoming_calls"][0].responder,
            //     state: "incoming",
            //     sdp: pdata["incoming_calls"][0].sdp,
            //     // sdp:pdata["incoming_calls"][0].answer
            //   };
            //   setIncomingCall(obj);

            //   // Using the functional form of setState to conditionally update the state
            //   // setAllGlobalData((prevGData) => {
            //   //   // Creating a new object with the same properties as the previous state
            //   //   // Updating the 'hobbies' property only if it exists
            //   //   console.log('obj',obj)
            //   //   return {
            //   //     ...prevGData,
            //   //     incoming_calls: [
            //   //       ...prevGData.incoming_calls,
            //   //       obj,
            //   //     ],
            //   //   };
            //   // });
            // }

            // setAllGlobalData((prevData) => {
            //   if (prevData["incoming_calls"].length===0) {
            //     console.log("this was first time");

            //     setAllGlobalData(f_data);
            //     // setLoading(false);
            //   }
            //   // else if (
            //   //   prevData &&
            //   //   f_data["incoming_calls"].length !==
            //   //     prevData["incoming_calls"].length
            //   // ) {
            //   //   console.log("there was a diff");
            //   //   // setAllGlobalData(f_data);
            //   //   // setLoading(false);
            //   // }
            //   return prevData;
            // });
            // setAllGlobalData((prv_data)=>{
            //   const prv_data_str = JSON.stringify(prv_data)
            //   const g_data_str = JSON.stringify(allGlobalData)
            //   let ret_data = prv_data
            //   if (prv_data_str!=g_data_str){
            //     ret_data = JSON.parse(g_data_str)
            //   }
            //   return data[0]
            // })
          }
        });

        socket.on("connect", () => {
          console.log("Socket connected");
        });

        socket.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      }

      return () => {
        if (auth_data) {
          clearInterval(intervalId);
          socket.disconnect();
        }
      };
    }, [socket, auth_data]);
    console.log("hope not rerendering some many times", allGlobalData);

    return (
      <Component
        auth_data={auth_data}
        login={login}
        logout={logout}
        allGlobalData={allGlobalData}
        setIncomingCall={setIncomingCall}
        // loading={loading}
        {...props}
        // with_userid={with_userid}
      />
    );
  };
};

const getRequestUID = async (with_userid, token) => {
  try {
    const response = await fetch(
      `http://192.168.1.2:8000/api/get_request_info_by_id/${with_userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        // body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully fetched user");
      return data;
    } else {
      console.log("Error fetching chat history");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // setLoading(false);
  }
};

function App({ login, auth_data }) {
  const [incoming_call_data, setIncomingCall] = useState(null);
  const [my_room, setMyRoomAs] = useState(null);

  // const [my_room, setMyRoomAs] = useState(null);

  const navigate = useNavigate();
  const [gSocket, setgSocket] = useState(null);

  const allGlobalData = useSelector((state) => {
    console.log("state here dsf", state);
    return state.globalData;
  });
  console.log(
    "hope we can see them here.",
    allGlobalData,
    Object.keys(allGlobalData).length
  );
  useEffect(() => {
    // Perform actions after the page is loaded
    const storedAuthData = localStorage.getItem("meUser");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      login(parsedAuthData);
      // if (
      //   allGlobalData &&
      //   allGlobalData["incoming_calls"] &&
      //   allGlobalData["incoming_calls"].length > 0
      // ) {
      //   const incomingCallData = allGlobalData["incoming_calls"][0];
      //   console.log("incomingCallDatadsfadsfa", incomingCallData); //NOTICE  JUST PROCESSING FIRST CALL IF MORE THERE SHOULD BE AN INFO THAT USER IS ON ANOTHER CALL
      //   navigate("/incoming_call", { state: { incomingCallData } });
      // }
    }
  }, [login]); // Dependency on login ensures the effect is re-run when login changes

  useEffect(() => {
    if (!gSocket && auth_data) {
      const newSocket = io.connect("http://192.168.1.2:8001", {
        query: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // newSocket.on("global_event_data", (data) => {
      //   if (data) {
      //     console.log("Datasdfasdf recdsfeived:", data);
      //   }
      // });

      setgSocket(newSocket);
    }

    return () => {
      if (gSocket) {
        gSocket.disconnect();
      }
    };
  }, [gSocket, auth_data]); // Dependency only on gSocket

  // useEffect(() => {
  //   const updateRoom = async () => {
  //     const JWT_TOKEN = localStorage.getItem("token");
  //     const token = `Bearer ${JWT_TOKEN}`;
  //     console.log('ahdfgsdfgfdg', token, auth_data.id)
  //     // const request_d = await getRequestUID(auth_data.id, token);
  //     // setMyRoomAs(request_d.id);
  //   };

  //   updateRoom();
  // }, [auth_data]);

  const dispatch = useDispatch();

  const handleIncoming = (payload) => {
    const incomingAction = {
      type: "INCOMING",
      payload: payload,
    };
    dispatch(incomingAction);
  };

  const respondIncoming = (payload) => {
    const incomingAction = {
      type: "ACCEPTED_INCOMING",
      payload: payload,
    };
    dispatch(incomingAction);
  };

  useEffect(() => {
    if (gSocket && auth_data) {
      // Join the room corresponding to my_room
      gSocket.emit("join_room", { room: String(auth_data.id) });

      // Event handler for 'new_chat_data_event'
      const handleNewDataEvent = (data) => {
        if (data) {
          const pdata = JSON.parse(data);
          console.log(typeof data, "unique", pdata, auth_data.id);
          if (Number(pdata.to_userid) == auth_data.id) {
            //just a validation check{

            if (pdata.status == "incoming" && pdata.offer) {
              // setIncomingCall(pdata)
              handleIncoming(pdata);
            } else if (pdata.status == "accepted_incoming" && pdata.answer) {
              console.log("HERE SHOULD BE ANS", pdata);
              if (pdata.answer) {
                const new_obj = {
                  answer: pdata.answer,
                  status: pdata.status,
                  frm_userid: pdata.frm_userid,
                  to_userid: pdata.to_userid,
                };
                console.log("WHATISTHEREALREADY", pdata);
                respondIncoming(new_obj);
              }
              // const new_obj = {...pdata}
              // setIncomingCall(new_obj)
            }
            //else just update the answer
            //let's send this answer to a redux state
            //and from there chatparent can get and pass it to wherever the video is being
            // rendered
          } else {
            console.warn(
              "There should be a log to record failing of this validation!!!"
            );
          }
          //FIRST CHECK IF CALL IS MEANT FOR US JUST A VALIDATION CHECK

          //IF NOT LET LOG IT SHOULD BE A LOG MESSAGE
          //ELSE Number(pdata.to_userid) && pdata.status == 'incoming'

          // await initializeWebRTC(token, "RESPONDER");
        }
      };

      gSocket.on("global_event_data", handleNewDataEvent);
      // Listen for 'new_chat_data_event' events
      // gSocket.on("new_chat_data_event", handleNewDataEvent);

      // Clean up the socket connection on component unmount or when my_room changes
      return () => {
        gSocket.emit("leave_room", { room: String(my_room) });
        gSocket.off("global_event_data", handleNewDataEvent);
      };
    }
  }, [gSocket, auth_data]);

  // useEffect(() => {
  //   console.log('here we can load room id i guess',auth_data)
  //   const getRoom = async () => {
  //     const JWT_TOKEN = localStorage.getItem("token");
  //     const token = `Bearer ${JWT_TOKEN}`;
  //     const request_d = await getRequestUID(auth_data.id, token);
  //     console.log('here is request_d',request_d)
  //     // setMyRoomAs(request_d.id);
  //   };

  //   getRoom();
  //   //make fetch call to request to get my_room

  //   // and also save it in redux??

  // }, [auth_data])

  return (
    <>
      {Object.keys(allGlobalData).length > 0 && (
        <IncomingCallUI incoming_call_data={allGlobalData} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <WrapperMobileShell header={true}>
              {auth_data ? <LoggedinHome /> : <Home />}
            </WrapperMobileShell>
          }
        />

        <Route path="/profile_detail/:id" element={<ProfileDetail />} />
        <Route
          path="/all_users"
          element={
            <PrivateRoute>
              <WrapperMobileShell>
                <AllUsers />
              </WrapperMobileShell>
            </PrivateRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <WrapperMobileShell>
                <Inbox />
              </WrapperMobileShell>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/google_authorized" element={<GoogleAuthorize />} />

        <Route
          path="/chat_ows"
          element={
            <PrivateRoute>
              <WrapperMobileShell>
                <ChatPARENTOWS />
              </WrapperMobileShell>
            </PrivateRoute>
          }
        />

        <Route
          path="/back_tile"
          element={
            <WrapperMobileBackShell>
              <BackTile />
            </WrapperMobileBackShell>
          }
        />

        <Route
          path="/edit_profile"
          element={
            <WrapperMobileBackShell title={"Preview Profile"}>
              <PreviewProfile />
            </WrapperMobileBackShell>
          }
        />
        <Route
          path="/edit_family"
          element={
            // <WrapperMobileBackShellWithSave title={"Family Details"}>
            <EditFamily />
            // </WrapperMobileBackShellWithSave>
          }
        />

      </Routes>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data,
  };
};

// export default App;
// export default connect(mapStateToProps, null)(React.memo(App));
// export default connect(mapStateToProps, { login, logout })(App);
export default connect(mapStateToProps, { login, logout, setIncomingCall })(
  withGlobalSocket(App)
);

// export default connect(mapStateToProps, { login, logout })(App);
