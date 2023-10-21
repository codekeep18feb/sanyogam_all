import React from 'react'
import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from './screen/MaterialUIExample'
import AdvancedMaterialUIExample from './screen/AdvancedMaterialUIExample'
import Pricing from "./screen/Pricing"
import TabPanel from "./screen/TabPanel"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Users from "./screen/Users"

// Import your components
import HomeScreen from './screen/HomeScreen.js';
import Login from './screen/LoginScreen.js';
import Chat from './screen/chat_components/Chat';
import SignupScreen from './screen/SignupScreen';
import Header from "./screen/Header"
import Video from './screen/video_components/Video.js';
import ModalDialog from "./screen/ModalDialog"
import SnackbarExample from "./screen/SnackbarExample"
import ItemList from './screen/ItemList'
import StepperExample from './screen/StepperExample'
import AccordionExample from './screen/AccordionExample'
import TooltipExample from './screen/TooltipExample'
import SnackbarWithActions from './screen/SnackbarWithActions'
import DummyLogin from './practice/DummyLogin'
import LoginScreen from './screen/LoginScreen.js'
import Footer from './screen/Footer'
import FAQ from './component/FAQ'
import GoogleAuthorize from './screen/GoogleAuthorize'
import PaymentForm from './screen/PaymentForm'

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
export default function App() {
  return (
    <Router>
      <Header />
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
      <Footer />

    </Router>
  );
    // <MaterialScreen />
    
  
}
