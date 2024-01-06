"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NewChatScreen;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Send = _interopRequireDefault(require("@mui/icons-material/Send"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function NewChatScreen(_ref) {
  let {
    chats,
    sendMsg
  } = _ref;
  const [textareaValue, setTextareaValue] = (0, _react.useState)("");
  const [sendingMessage, setSendingMessage] = (0, _react.useState)(false);
  const handleTextareaChange = e => {
    setTextareaValue(e.target.value);
  };
  const handleSendMessage = async () => {
    if (textareaValue.trim() === "") {
      return; // Don't send empty messages
    } else {
      sendMsg(textareaValue);
      setTextareaValue("");
    }

    // Prepare the request body
    const requestBody = {
      content: textareaValue
    };
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);

    // Update the UI to indicate sending
    setSendingMessage(true);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      "flex-direction": "column",
      height: "550px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      "flex-grow": 1,
      "background-color": "lightblue"
    }
  }, chats && chats.map((chat, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index,
    style: {
      padding: "10px",
      color: Object.keys("who") && chat.who !== "ME" ? "green" : "grey",
      textAlign: Object.keys("who") && chat.who === "ME" ? "left" : "right",
      fontStyle: "italic",
      fontSize: "19px"
    }
  }, chat.msg)))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "space-around"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 8
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    style: {
      width: "100%",
      borderRadius: "20px",
      textAlign: "center" // Center-align the placeholder text
    },
    placeholder: "Type something...",
    value: textareaValue,
    onChange: handleTextareaChange,
    disabled: sendingMessage // Disable textarea while sending
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_Send.default, {
    style: {
      fontSize: "35px",
      color: "#1F4294"
    },
    onClick: handleSendMessage,
    disabled: sendingMessage
  })))));
}