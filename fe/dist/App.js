"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MaterialUIExample = _interopRequireDefault(require("./screen/MaterialUIExample"));
var _reactRedux = require("react-redux");
var _AdvancedMaterialUIExample = _interopRequireDefault(require("./screen/AdvancedMaterialUIExample"));
var _Pricing = _interopRequireDefault(require("./screen/Pricing"));
var _TabPanel = _interopRequireDefault(require("./screen/TabPanel"));
var _reactRouterDom = require("react-router-dom");
var _Users = _interopRequireDefault(require("./screen/Users"));
var _socket = _interopRequireDefault(require("socket.io-client"));
var _Inbox = _interopRequireDefault(require("./screen/Inbox"));
var _AuthAction = require("./redux/counter/AuthAction");
var _GlobalAction = require("./redux/counter/GlobalAction");
var _HomeScreen = _interopRequireDefault(require("./screen/HomeScreen.js"));
var _Chat = _interopRequireDefault(require("./screen/chat_components/Chat"));
var _SignupScreen = _interopRequireDefault(require("./screen/SignupScreen"));
var _Video = _interopRequireDefault(require("./screen/video_components/Video.js"));
var _ModalDialog = _interopRequireDefault(require("./screen/ModalDialog"));
var _SnackbarExample = _interopRequireDefault(require("./screen/SnackbarExample"));
var _ItemList = _interopRequireDefault(require("./screen/ItemList"));
var _StepperExample = _interopRequireDefault(require("./screen/StepperExample"));
var _AccordionExample = _interopRequireDefault(require("./screen/AccordionExample"));
var _TooltipExample = _interopRequireDefault(require("./screen/TooltipExample"));
var _SnackbarWithActions = _interopRequireDefault(require("./screen/SnackbarWithActions"));
var _LoginScreen = _interopRequireDefault(require("./screen/LoginScreen.js"));
var _FAQ = _interopRequireDefault(require("./component/FAQ"));
var _GoogleAuthorize = _interopRequireDefault(require("./screen/GoogleAuthorize"));
var _PlayGround = _interopRequireDefault(require("./screen/PlayGround.js"));
var _BackTile = _interopRequireDefault(require("./component/reusables/BackTile.js"));
var _WrapperMobileShell = _interopRequireDefault(require("./screen/WrapperMobileShell.js"));
var _WrapperMobileBackShell = _interopRequireDefault(require("./screen/WrapperMobileBackShell.js"));
var _WrapperMobileBackShellWithSave = _interopRequireDefault(require("./screen/WrapperMobileBackShellWithSave.js"));
var _EditFamily = _interopRequireDefault(require("./component/EditFamily.js"));
var _PreviewProfile = _interopRequireDefault(require("./component/PreviewProfile.js"));
var _ProfileBriefTile = _interopRequireDefault(require("./screen/ProfileBriefTile"));
var _Home = _interopRequireDefault(require("./screen/Home.js"));
var _SendMsgWS = _interopRequireDefault(require("./component/SendMsgWS.js"));
var _ChatWS = _interopRequireDefault(require("./screen/chat_components/ChatWS.js"));
var _PlayGround2 = _interopRequireDefault(require("./screen/PlayGround2.js"));
var _ChatPARENTOWS = _interopRequireDefault(require("./screen/chat_components/ows/ChatPARENTOWS.js"));
var _IncomingCallUI = _interopRequireDefault(require("./screen/chat_components/ows/IncomingCallUI"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // import MaterialScreen from './screen/MaterialScreen'
// Import your components
// import Login from './screen/LoginScreen.js';
// import HeaderDesktop from "./screen/HeaderDesktop.js"
// import DummyLogin from './practice/DummyLogin'
// import Footer from './screen/Footer'
// import PaymentForm from './screen/PaymentForm'
// import { useState } from 'react'
// import HeaderMobile from './screen/HeaderMobile.js'
// import InboxPractice from './screen/InboxPractice.js'
// import ProfileBriefTile from './screen/ProfileBriefTile.js';

const MaterialUX = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialUIExample.default, null), /*#__PURE__*/_react.default.createElement(_AdvancedMaterialUIExample.default, null), /*#__PURE__*/_react.default.createElement(_TabPanel.default, null), /*#__PURE__*/_react.default.createElement(_ModalDialog.default, null), /*#__PURE__*/_react.default.createElement(_SnackbarExample.default, null), /*#__PURE__*/_react.default.createElement(_ItemList.default, null), /*#__PURE__*/_react.default.createElement(_StepperExample.default, null), /*#__PURE__*/_react.default.createElement(_AccordionExample.default, null), /*#__PURE__*/_react.default.createElement(_TooltipExample.default, null), /*#__PURE__*/_react.default.createElement(_SnackbarWithActions.default, null));
};
function PrivateRoute(_ref) {
  let {
    children
  } = _ref;
  const auth = useAuth();
  return auth ? children : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
    to: "/login"
  });
}
function useAuth() {
  return localStorage.getItem("token") !== null;
}
const withGlobalSocket = Component => {
  // const JWT_TOKEN = localStorage.getItem("token");
  // const token = `Bearer ${JWT_TOKEN}`;

  return function WithSocketComponent(_ref2) {
    let {
      setIncomingCall,
      auth_data,
      login,
      logout,
      ...props
    } = _ref2;
    console.log("did it rerendering now without me setting the data in sgam.db?", auth_data);
    const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000", {
      query: {
        Authorization: "Bearer ".concat(localStorage.getItem("token"))
      }
    }));
    const [allGlobalData, setAllGlobalData] = (0, _react.useState)({
      incoming_calls: [],
      notifications: []
    });
    const [loading, setLoading] = (0, _react.useState)(true);
    (0, _react.useEffect)(() => {
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
        socket.on("listen_global_events", data => {
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
                sdp: pdata["incoming_calls"][0].sdp
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
    return /*#__PURE__*/_react.default.createElement(Component, _extends({
      auth_data: auth_data,
      login: login,
      logout: logout,
      allGlobalData: allGlobalData,
      setIncomingCall: setIncomingCall
      // loading={loading}
    }, props));
  };
};
function App(_ref3) {
  let {
    login
  } = _ref3;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const allGlobalData = (0, _reactRedux.useSelector)(state => {
    console.log("state here dsf", state);
    return state.globalData;
  });
  console.log("hope we can see them here.", allGlobalData);
  (0, _react.useEffect)(() => {
    // Perform actions after the page is loaded
    const storedAuthData = localStorage.getItem("meUser");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      login(parsedAuthData);
      if (allGlobalData && allGlobalData["incoming_calls"] && allGlobalData["incoming_calls"].length > 0) {
        const incomingCallData = allGlobalData["incoming_calls"][0];
        console.log("incomingCallDatadsfadsfa", incomingCallData); //NOTICE  JUST PROCESSING FIRST CALL IF MORE THERE SHOULD BE AN INFO THAT USER IS ON ANOTHER CALL
        navigate("/incoming_call", {
          state: {
            incomingCallData
          }
        });
      }
    }
  }, [login, allGlobalData, navigate]); // Dependency on login ensures the effect is re-run when login changes

  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_Home.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/incoming_call",
    element:
    /*#__PURE__*/
    // <WrapperMobileShell>
    _react.default.createElement(_IncomingCallUI.default, null)
    // </WrapperMobileShell>
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/sendmsgws",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_SendMsgWS.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/_react.default.createElement(_LoginScreen.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/faq",
    element: /*#__PURE__*/_react.default.createElement(_FAQ.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/signup",
    element: /*#__PURE__*/_react.default.createElement(_SignupScreen.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/pricing",
    element: /*#__PURE__*/_react.default.createElement(_Pricing.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/google_authorized",
    element: /*#__PURE__*/_react.default.createElement(_GoogleAuthorize.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/all_users",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_Users.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/inbox",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_Inbox.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/practice",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_PlayGround.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/practice2",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_PlayGround2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/chat",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_Chat.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/chat_ows",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_ChatPARENTOWS.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/chat_ws",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_ChatWS.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/video_chat",
    element: /*#__PURE__*/_react.default.createElement(PrivateRoute, null, /*#__PURE__*/_react.default.createElement(_WrapperMobileShell.default, null, /*#__PURE__*/_react.default.createElement(_Video.default, null)))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/back_tile",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileBackShell.default, null, /*#__PURE__*/_react.default.createElement(_BackTile.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/edit_profile",
    element: /*#__PURE__*/_react.default.createElement(_WrapperMobileBackShell.default, {
      title: "Preview Profile"
    }, /*#__PURE__*/_react.default.createElement(_PreviewProfile.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/edit_family",
    element:
    /*#__PURE__*/
    // <WrapperMobileBackShellWithSave title={"Family Details"}>
    _react.default.createElement(_EditFamily.default, null)
    // </WrapperMobileBackShellWithSave>
  }));
}
const mapStateToProps = state => {
  return {
    auth_data: state.auth.data
  };
};

// export default App;
// export default connect(mapStateToProps, null)(React.memo(App));
// export default connect(mapStateToProps, { login, logout })(App);
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  login: _AuthAction.login,
  logout: _AuthAction.logout,
  setIncomingCall: _GlobalAction.setIncomingCall
})(withGlobalSocket(App)); // export default connect(mapStateToProps, { login, logout })(App);