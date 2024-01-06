"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _socket = _interopRequireDefault(require("socket.io-client"));
var _NewChatScreen = _interopRequireDefault(require("./NewChatScreen"));
var _material = require("@mui/material");
var _ChatsOWSTile = _interopRequireDefault(require("./ChatsOWSTile"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _VideoCall = _interopRequireDefault(require("@mui/icons-material/VideoCall"));
var _ImageCircle = require("../../chat_components/ImageCircle");
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _core = require("@material-ui/core");
var _PhoneCallUI = _interopRequireDefault(require("../../PhoneCallUI"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function (e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return {
    default: e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function IncomingCallUIL(_ref) {
  var _location$state;
  let {
    auth_data,
    allChats,
    loading,
    // with_email,
    with_userid,
    SetWithUserId,
    SetWithEmail
  } = _ref;
  const location = (0, _reactRouterDom.useLocation)();
  const incomingCallData = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.incomingCallData;

  // console.log('waht is type of',incomingCallData)
  const [connection_open, setConnectionOpened] = (0, _react.useState)(false);
  console.log("is it opened?", connection_open);
  // const [videoMode, setVideoMode] = useState(false);
  // const [signal_pool, setSignalPool] = useState({});
  // const [callStatus, setCallStatus] = useState({"status":null});

  const myVideoRef = (0, _react.useRef)(null);
  const myRef = (0, _react.useRef)(null);

  // console.log("logged in user", auth_data, videoMode);
  // console.log("if it renders without a click", signal_pool);
  // console.log("this shoudl not rerender if other twos are toaking", videoMode);

  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000", {
    query: {
      Authorization: "Bearer ".concat(localStorage.getItem("token"))
    }
  }));
  const initializeWebRTC = async token => {
    console.log("Ensure it's not called multiple times...");
    const rc = new RTCPeerConnection();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    console.log("doweseestream", stream);
    myVideoRef.current.srcObject = stream;
    rc.addStream(stream);
    console.log("doweseestream", stream);
    rc.onaddstream = event => {
      console.log("ON REMOTE @ TRACK", event, event.stream, myRef.current);
      myVideoRef.current.srcObject = event.stream;
    };
    rc.ondatachannel = event => {
      // Handle the data channel when it is created
      const dataChannel = event.channel;
      dataChannel.onopen = () => {
        console.log("Data channel opened!");
        // You can add any specific actions you want to perform when the data channel is open.
      };

      // Handle other data channel events if needed
    };
    rc.onicecandidate = async e => {
      if (e.candidate) {
        console.log("whatisthestatus?" + JSON.stringify(rc.localDescription), "".concat(auth_data.id, "_").concat(with_userid));
        //THIS IS WHERE WILL MAKE
        // const to_user_id = await fetchUserId(token, with_email);
        const answer = JSON.stringify(rc.localDescription);
        const offer_obj = {
          answer: answer,
          action: "UPDATE"
        };
        const offer_str = JSON.stringify(offer_obj);
        console.log("AREWEHERE");
        socket.emit("signal_pool", offer_str, with_userid);
        // saveRTCUserAns(
        //   false,
        //   JSON.stringify(rc.localDescription),
        //   to_user_id
        // );
      }
    };
    const p_offer = JSON.parse(incomingCallData.sdp);
    // const offer_str = await fetchRTCOffer();
    // console.log(p_offer, 'what is the diff', offer_str)
    rc.setRemoteDescription(p_offer).then(a => {
      console.log("set remoteDescription with local offer");
      console.log("Signaling State after setting remoteDescription", rc.signalingState);
    });
    rc.createAnswer().then(a => {
      rc.setLocalDescription(a);
      console.log("Signaling State after setting Local description set as a provisional answer.:", rc.signalingState);
    }).then(a => {
      console.log("answer created");
      console.log("Signaling State after setting Local description set as a provisional answer.:", rc.signalingState);
    });
    return [rc];
  };
  const navigate = (0, _reactRouterDom.useNavigate)();
  const attachRightListnersToRef = () => {
    myRef.current.channel.addEventListener("iceconnectionstatechange", () => {
      console.log("ICE Connection State changed:", myRef.current.channel.iceConnectionState);
      if (myRef.current.channel.iceConnectionState === "closed" || myRef.current.channel.iceConnectionState === "failed") {
        console.log("disconnected now");
        // The connection is closed or failed
        // Update call status accordingly
        // For example: setCallStatus({ status: 'DISCONNECTED' });
      }

      // if (myRef.current.channel.iceConnectionState === 'connected') {
      //   // ICE connection is fully established
      //   setConnectionOpened(true);
      // }
    });
    myRef.current.channel.addEventListener("connectionstatechange", () => {
      console.log("Connection State changed:", myRef.current.channel.connectionState);
      if (myRef.current.channel.connectionState === "closed" || myRef.current.channel.connectionState === "failed") {
        console.log("disconnected now connectionstatechange");
        navigate("/snsydwh");

        // The connection is closed or failed
        // Update call status accordingly
        // For example: setCallStatus({ status: 'DISCONNECTED' });
      }
      // if (myRef.current.channel.connectionState === 'connected') {
      //   // Connection is fully established
      //   setConnectionOpened(true);
      // }
    });
    myRef.current.channel.addEventListener("signalingstatechange", () => {
      console.log("AREWHEREWREVER");
      console.log(typeof myRef.current.channel, myRef.current.channel, "Signaling State changed:", myRef.current.channel.signalingState, myRef.current.channel.iceConnectionState, myRef.current.channel.connectionState);
      if (myRef.current.channel.signalingState === "stable") {
        // console.log('so this is INITIATOR CASE')
        console.log("in INITIATOR connection stateus");
        setConnectionOpened(true);
      }
    });
  };
  const pickUpTheCall = async () => {
    console.log("pickUpTheCall");
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    const [rc] = await initializeWebRTC(token);
    console.log("here is your rc save it myRef if you need", rc);
    myRef.current = {
      type: "RESPONDER",
      channel: rc
    };
    attachRightListnersToRef();
    // startTheConnection();
  };
  const chatScreenBody = /*#__PURE__*/_react.default.createElement("div", null, loading && !incomingCallData && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null), incomingCallData.to_id === auth_data.id && incomingCallData.sdp && !incomingCallData.answer && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, !connection_open && /*#__PURE__*/_react.default.createElement(_PhoneCallUI.default
  // callStatus={"INITIALIZING"}
  , {
    pickUpTheCall: pickUpTheCall
    // with_userid={with_userid}
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: connection_open ? "block" : "none"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "here is video RESPONDER"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement("video", {
    ref: myVideoRef // Add a ref to the video element
    ,

    autoPlay: true,
    playsInline: true,
    muted: true // You may want to remove this if it's not the local video
  })))));
  return /*#__PURE__*/_react.default.createElement("div", null, chatScreenBody);
}
const mapStateToProps = state => {
  return {
    auth_data: state.auth.data
  };
};

// export default connect(mapStateToProps)(withChatSocket(IncomingCallUIL));
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(IncomingCallUIL);