"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _socket = _interopRequireDefault(require("socket.io-client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// App.js

const socket = (0, _socket.default)("http://localhost:8000");
const SendMessage = _ref => {
  let {
    peerId
  } = _ref;
  const [message, setMessage] = (0, _react.useState)("");
  const handleMessageSubmit = e => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Emit the 'send_message' event with the message content and peer ID
      console.log("aewqrewrqwe", message, peerId);
      socket.emit("send_message", {
        message,
        to: peerId
      });
      setMessage("");
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Send a Message"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleMessageSubmit
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Type your message",
    value: message,
    onChange: e => setMessage(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, "Send")));
};
const ReceiveMessage = _ref2 => {
  let {
    messages
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Received Messages"), /*#__PURE__*/_react.default.createElement("ul", null, messages.map((msg, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index
  }, msg))));
};
const App = () => {
  const [messages, setMessages] = (0, _react.useState)([]);
  const [peerId, setPeerId] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    // Event listener for the 'receive_message' event
    socket.on("receive_message", data => {
      console.log("here there was a message");
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Peer-to-Peer Text Chat"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Enter peer ID",
    value: peerId,
    onChange: e => setPeerId(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(SendMessage, {
    peerId: peerId
  }), /*#__PURE__*/_react.default.createElement(ReceiveMessage, {
    messages: messages
  }));
};
var _default = exports.default = App;