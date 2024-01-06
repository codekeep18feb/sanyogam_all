"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _sample = _interopRequireDefault(require("./sample.mp3"));
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
// Adjust the path accordingly

const PhoneCallUI = _ref => {
  let {
    callStatus
  } = _ref;
  const audioRef = (0, _react.useRef)(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => console.log("Audio playback started")).catch(error => console.error("Error playing audio:", error));
    }
  };

  // useEffect(() => {
  //   // Play the audio when the component is mounted
  //   playAudio();
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  (0, _react.useEffect)(() => {
    // if (callStatus === 'RINGING') {
    //   // You can still perform other actions related to the ringing status here
    // }
    console.log("callStatus changed now is - ", callStatus);
  }, [callStatus]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("audio", {
    ref: audioRef
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: _sample.default,
    type: "audio/mp3"
  }), "Your browser does not support the audio element."), /*#__PURE__*/_react.default.createElement("div", {
    onClick: playAudio
  }, "audio interface"));
};
var _default = exports.default = PhoneCallUI;