
import React from 'react'
// import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from './screen/MaterialUIExample'
import { connect } from 'react-redux';
import AdvancedMaterialUIExample from './screen/AdvancedMaterialUIExample'
import Pricing from "./screen/Pricing"
import TabPanel from "./screen/TabPanel"
import { Route, Routes, Navigate } from 'react-router-dom';
import Users from "./screen/Users"

import Inbox from "./screen/Inbox"

import { login, logout } from './redux/counter/AuthAction';

// Import your components
import HomeScreen from './screen/HomeScreen.js';
// import Login from './screen/LoginScreen.js';
import Chat from './screen/chat_components/Chat';
import SignupScreen from './screen/SignupScreen';
// import HeaderDesktop from "./screen/HeaderDesktop.js"
import Video from './screen/video_components/Video.js';
import ModalDialog from "./screen/ModalDialog"
import SnackbarExample from "./screen/SnackbarExample"
import ItemList from './screen/ItemList'
import StepperExample from './screen/StepperExample'
import AccordionExample from './screen/AccordionExample'
import TooltipExample from './screen/TooltipExample'
import SnackbarWithActions from './screen/SnackbarWithActions'
// import DummyLogin from './practice/DummyLogin'
import LoginScreen from './screen/LoginScreen.js'
// import Footer from './screen/Footer'
import FAQ from './component/FAQ'
import GoogleAuthorize from './screen/GoogleAuthorize'
// import PaymentForm from './screen/PaymentForm'
import { useEffect } from 'react'
// import { useState } from 'react'
// import HeaderMobile from './screen/HeaderMobile.js'
// import InboxPractice from './screen/InboxPractice.js'
import PlayGround from './screen/PlayGround.js'
import BackTile from './component/reusables/BackTile.js';
import WrapperMobileShell from './screen/WrapperMobileShell.js';
import WrapperMobileBackShell from './screen/WrapperMobileBackShell.js';

import WrapperMobileBackShellWithSave from './screen/WrapperMobileBackShellWithSave.js';

import EditFamily from './component/EditFamily.js';
import PreviewProfile from "./component/PreviewProfile.js"
import ProfileBriefTile from './screen/ProfileBriefTile';
import Home from './screen/Home.js';
import SendMsgWS from './component/SendMsgWS.js';
import ChatWS from './screen/chat_components/ChatWS.js';
import PlayGround2 from './screen/PlayGround2.js';
// import ProfileBriefTile from './screen/ProfileBriefTile.js';

const MaterialUX = ()=>{

  return(
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
  )
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}



function useAuth() {
  return localStorage.getItem('token') !== null;
}


function App({ authData,login }) {

  useEffect(() => {
    // Perform actions after the page is loaded
    const storedAuthData = localStorage.getItem('meUser');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      login(parsedAuthData);
    }
  }, [login]); // Dependency on login ensures the effect is re-run when login changes


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
        path="/sendmsgws"
        element={
          <WrapperMobileShell>
            <SendMsgWS />
          </WrapperMobileShell>
        }
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/material" element={<MaterialUX />} />
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
          <PreviewProfile  />
        </WrapperMobileBackShell>
        }
      />
<Route
        path="/edit_family"
        element={
        
          // <WrapperMobileBackShellWithSave title={"Family Details"}>
          <EditFamily  />
        // </WrapperMobileBackShellWithSave>
        }
      />
    </Routes>
  );
}


  const mapStateToProps = (state) => {
    console.log("authdatawhat", state.auth.data);
    return {
      authData: state.auth.data,
    };
  };
  

// export default App;
// export default connect(mapStateToProps, null)(React.memo(App));
export default connect(mapStateToProps, { login, logout })(App);

