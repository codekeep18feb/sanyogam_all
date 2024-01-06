"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PhoneCallUI;
var _react = _interopRequireWildcard(require("react"));
var _CallEnd = _interopRequireDefault(require("@mui/icons-material/CallEnd"));
var _VolumeMute = _interopRequireDefault(require("@mui/icons-material/VolumeMute"));
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
function PhoneCallUI(_ref) {
  let {
    callStatus,
    pickUpTheCall,
    with_userid
  } = _ref;
  // const audioRef = useRef(null);
  // console.log('what is it',callStatus)
  // const playAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play()
  //       .then(() => console.log('Audio playback started'))
  //       .catch(error => console.error('Error playing audio:', error));
  //   }
  // };
  // useEffect(() => {
  //   if (callStatus === 'RINGING') {
  //     console.log("is ringing..");
  //     playAudio()
  //     // You can still perform other actions related to the ringing status here
  //   }

  // }, [callStatus])

  const containerStyle = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    border: "1px solid green"
  };
  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70vh",
    backgroundImage: 'url("https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg")',
    // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
  const controlsStyle = {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    width: "80%",
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
  };
  const buttonStyle = {
    padding: "20px",
    fontSize: "26px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    border: "1px solid red",
    borderRadius: "100%",
    margin: "10px"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: backgroundStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: controlsStyle
  }, /*#__PURE__*/_react.default.createElement(_CallEnd.default, {
    style: buttonStyle,
    onClick: () => {
      pickUpTheCall();
    }
  }), /*#__PURE__*/_react.default.createElement(_CallEnd.default, {
    style: buttonStyle
  }), /*#__PURE__*/_react.default.createElement(_VolumeMute.default, {
    style: buttonStyle
  }))));
}