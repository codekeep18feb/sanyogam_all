import React from "react";
// import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from "./screen/MaterialUIExample";
import { connect, useSelector } from "react-redux";
import AdvancedMaterialUIExample from "./screen/AdvancedMaterialUIExample";
import Pricing from "./screen/Pricing";
import TabPanel from "./screen/TabPanel";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Users from "./screen/Users";
import io from "socket.io-client";

import Inbox from "./screen/Inbox";

import { login, logout } from "./redux/counter/AuthAction";

import { setIncomingCall } from "./redux/counter/GlobalAction";

// Import your components
import HomeScreen from "./screen/HomeScreen.js";
// import Login from './screen/LoginScreen.js';
import Chat from "./screen/chat_components/Chat";
import SignupScreen from "./screen/SignupScreen";
// import HeaderDesktop from "./screen/HeaderDesktop.js"
import Video from "./screen/video_components/Video.js";
import ModalDialog from "./screen/ModalDialog";
import SnackbarExample from "./screen/SnackbarExample";
import ItemList from "./screen/ItemList";
import StepperExample from "./screen/StepperExample";
import AccordionExample from "./screen/AccordionExample";
import TooltipExample from "./screen/TooltipExample";
import SnackbarWithActions from "./screen/SnackbarWithActions";
// import DummyLogin from './practice/DummyLogin'
import LoginScreen from "./screen/LoginScreen.js";
// import Footer from './screen/Footer'
import FAQ from "./component/FAQ";
import GoogleAuthorize from "./screen/GoogleAuthorize";
// import PaymentForm from './screen/PaymentForm'
import { useEffect, useState } from "react";
// import { useState } from 'react'
// import HeaderMobile from './screen/HeaderMobile.js'
// import InboxPractice from './screen/InboxPractice.js'
import PlayGround from "./screen/PlayGround.js";
import BackTile from "./component/reusables/BackTile.js";
import WrapperMobileShell from "./screen/WrapperMobileShell.js";
import WrapperMobileBackShell from "./screen/WrapperMobileBackShell.js";

import WrapperMobileBackShellWithSave from "./screen/WrapperMobileBackShellWithSave.js";

import EditFamily from "./component/EditFamily.js";
import PreviewProfile from "./component/PreviewProfile.js";
import ProfileBriefTile from "./screen/ProfileBriefTile";
import Home from "./screen/Home.js";
import SendMsgWS from "./component/SendMsgWS.js";
import ChatWS from "./screen/chat_components/ChatWS.js";
import PlayGround2 from "./screen/PlayGround2.js";
import ChatPARENTOWS from "./screen/chat_components/ows/ChatPARENTOWS.js";
import IncomingCallUI from "./screen/chat_components/ows/IncomingCallUI";
// import ProfileBriefTile from './screen/ProfileBriefTile.js';

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
      io.connect("http://192.168.1.10:8000", {
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
        const fetchGlobalEvents = () => {
          // const room = "hardcode";
          console.log("authherenow", auth_data, login);
          socket.emit("listen_global_events", auth_data.id);
        };

        fetchGlobalEvents();

        intervalId = setInterval(() => {
          fetchGlobalEvents();
        }, 1000);

        socket.on("listen_global_events", (data) => {
          if (data) {
            // console.log("here is global data", "data",data);
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
            const pdata = JSON.parse(data);
            console.log("sdfasdafsadfdf", pdata);
            // const f_data = pdata; //.filter((i) => (i.frm_user === with_userid));
            console.log("f_datahere", pdata["incoming_calls"].length);
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

            if ("incoming_calls" in pdata) {
              console.log("incoming_calls yessdfsdf", pdata["incoming_calls"]);
              const obj = {
                frm_id: pdata["incoming_calls"][0].initiator,
                to_id: pdata["incoming_calls"][0].responder,
                state: "incoming",
                sdp: pdata["incoming_calls"][0].sdp,
                // sdp:pdata["incoming_calls"][0].answer
              };
              setIncomingCall(obj);

              // Using the functional form of setState to conditionally update the state
              // setAllGlobalData((prevGData) => {
              //   // Creating a new object with the same properties as the previous state
              //   // Updating the 'hobbies' property only if it exists
              //   console.log('obj',obj)
              //   return {
              //     ...prevGData,
              //     incoming_calls: [
              //       ...prevGData.incoming_calls,
              //       obj,
              //     ],
              //   };
              // });
            }

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

function App({ login }) {
  const navigate = useNavigate();
  const allGlobalData = useSelector((state) => {
    console.log("state here dsf", state);
    return state.globalData;
  });
  console.log("hope we can see them here.", allGlobalData);
  useEffect(() => {
    // Perform actions after the page is loaded
    const storedAuthData = localStorage.getItem("meUser");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      login(parsedAuthData);
      if (
        allGlobalData &&
        allGlobalData["incoming_calls"] &&
        allGlobalData["incoming_calls"].length > 0
      ) {
        const incomingCallData = allGlobalData["incoming_calls"][0];
        console.log("incomingCallDatadsfadsfa", incomingCallData); //NOTICE  JUST PROCESSING FIRST CALL IF MORE THERE SHOULD BE AN INFO THAT USER IS ON ANOTHER CALL
        navigate("/incoming_call", { state: { incomingCallData } });
      }
    }
  }, [login, allGlobalData, navigate]); // Dependency on login ensures the effect is re-run when login changes

  return (
    <Routes>
      <Route
        path="/"
        element={
          <WrapperMobileShell>
            <Home />
          </WrapperMobileShell>
        }
      />

      <Route
        path="/incoming_call"
        element={
          // <WrapperMobileShell>
          <IncomingCallUI />
          // </WrapperMobileShell>
        }
      />
      <Route
        path="/sendmsgws"
        element={
          <WrapperMobileShell>
            <SendMsgWS />
          </WrapperMobileShell>
        }
      />
      <Route path="/login" element={<LoginScreen />} />
      {/* <Route path="/material" element={<MaterialUX />} /> */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/google_authorized" element={<GoogleAuthorize />} />
      <Route
        path="/all_users"
        element={
          <PrivateRoute>
            <WrapperMobileShell>
              <Users />
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

      <Route
        path="/practice"
        element={
          <WrapperMobileShell>
            <PlayGround />
          </WrapperMobileShell>
        }
      />
      <Route
        path="/practice2"
        element={
          <WrapperMobileShell>
            <PlayGround2 />
          </WrapperMobileShell>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <WrapperMobileShell>
              <Chat />
            </WrapperMobileShell>
          </PrivateRoute>
        }
      />
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
        path="/chat_ws"
        element={
          <PrivateRoute>
            <WrapperMobileShell>
              <ChatWS />
            </WrapperMobileShell>
          </PrivateRoute>
        }
      />
      <Route
        path="/video_chat"
        element={
          <PrivateRoute>
            <WrapperMobileShell>
              <Video />
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
