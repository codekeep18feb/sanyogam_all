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
const MyWSComponent = () => {
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000"));
  const [messages, setMessages] = (0, _react.useState)([]);
  const [messageInput, setMessageInput] = (0, _react.useState)("");
  const [selectedPrefix, setSelectedPrefix] = (0, _react.useState)("AC");
  const handlePrefixChange = event => {
    setSelectedPrefix(event.target.value);
  };
  const sendMessage = () => {
    const message = selectedPrefix + messageInput;
    socket.emit("message", message);
    setMessageInput("");
  };
  _react.default.useEffect(() => {
    socket.on("message", data => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, [messages, socket]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "WebSocket Echo"), /*#__PURE__*/_react.default.createElement("ul", null, messages.map((message, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index
  }, message))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "prefix",
    value: "AC",
    checked: selectedPrefix === "AC",
    onChange: handlePrefixChange
  }), " ", "AC"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "prefix",
    value: "DC",
    checked: selectedPrefix === "DC",
    onChange: handlePrefixChange
  }), " ", "DC")), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: messageInput,
    onChange: e => setMessageInput(e.target.value),
    placeholder: "Type your message"
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: sendMessage
  }, "Send"));
};
var _default = exports.default = MyWSComponent;