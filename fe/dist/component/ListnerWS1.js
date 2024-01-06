"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _socket = _interopRequireDefault(require("socket.io-client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ListnerWS1 = () => {
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000"));
  const [messages, setMessages] = (0, _react.useState)([]);
  const [messageInput, setMessageInput] = (0, _react.useState)("");
  const [selectedPrefix, setSelectedPrefix] = (0, _react.useState)(null);
  const userAgent = navigator.userAgent;
  const [browserName, setBrowserName] = (0, _react.useState)("");
  const handlePrefixChange = event => {
    setSelectedPrefix(event.target.value);
  };
  const sendMessage = message => {
    socket.emit("message", message);
  };
  (0, _react.useEffect)(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") !== -1) {
      setBrowserName("Google Chrome");
    } else if (userAgent.indexOf("Firefox") !== -1) {
      setBrowserName("Mozilla Firefox");
    } else if (userAgent.indexOf("Safari") !== -1) {
      setBrowserName("Apple Safari");
    } else if (userAgent.indexOf("Edge") !== -1) {
      setBrowserName("Microsoft Edge");
    } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
      setBrowserName("Opera");
    } else if (userAgent.indexOf("Trident") !== -1) {
      setBrowserName("Internet Explorer");
    } else {
      setBrowserName("Unknown Browser");
    }
  }, []);

  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     console.log('this should be same for all theclients :)',data)
  //   socket.emit('message', message);

  //   });

  //   return () => {
  //     // socket.disconnect();
  //   console.log('will it only run if unmounting is happening')
  //   };
  // }, [socket]);

  _react.default.useEffect(() => {
    socket.on("message", data => {
      console.log("arerwehere??", data);
      setMessages([...messages, data]);
    });
    return () => {
      socket.disconnect();
      console.log("will it only run if unmounting is happening");
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "dfasdf"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: e => {
      // e.preventDefault()
      sendMessage("HARDCODED MESSAGE from" + userAgent);
    }
  }, "Send WS msg"));
};
var _default = exports.default = ListnerWS1;