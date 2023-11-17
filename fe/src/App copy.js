
import React from 'react'
// import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from './screen/MaterialUIExample'
import { connect } from 'react-redux';
import AdvancedMaterialUIExample from './screen/AdvancedMaterialUIExample'
import Pricing from "./screen/Pricing"
import TabPanel from "./screen/TabPanel"
import { Route, Routes, Navigate } from 'react-router-dom';
import Users from "./screen/Users"
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
  
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // Save the Redux state to localStorage before the page is unloaded
  //     console.log('BEFORE REFRESH',authData)
  //     // const meUser = /* Get meUser from your Redux state */;
  //     // localStorage.setItem('meUser', JSON.stringify(meUser));
  //   };

  //   // Add the event listener
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Remove the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []); // Dependency array is empty, so the effect runs once after the initial render


  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // Save the Redux state to localStorage before the page is unloaded
  //     if (authData) {
  //       console.log('BEFORE REFRESH', authData);
  //       login(authData)

  //       // Save to localStorage or perform any other action you need
  //     }
  //   };
  
  //   // Add the event listener
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  
  //   // Remove the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [authData,login]);

  useEffect(() => {
    // Perform actions after the page is loaded
    const storedAuthData = localStorage.getItem('meUser');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      login(parsedAuthData);
    }
  }, [login]); // Dependency on login ensures the effect is re-run when login changes


  return (
   
    <>
      <Routes>
        {/* <Route exact path="/" element={<HomeScreen />} /> */}
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        
        <Route path="/material" element={<MaterialUX />} />
        <Route path="/faq" element={<FAQ />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/pricing" element={<Pricing/>} />
        {/* <Route path="/stripe" element={<PaymentForm />} /> */}
        
        <Route path="/google_authorized" element={<GoogleAuthorize />} />
        
        <Route
          path="/all_users"
          element={
            <PrivateRoute>
              <Users /> 
            </PrivateRoute>
          }
        />

        <Route
          path="/practice"
          element={
            // <PrivateRoute>
            <PlayGround/> 
            // <ProfileBriefTile />
            // </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
                  path="/video_chat"
                  element={
                    <PrivateRoute>
                      <Video />
                    </PrivateRoute>
                  }
                />

      </Routes>


    </>

  );
    // <MaterialScreen />
    
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

