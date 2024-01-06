"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NewChatScreen;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Send = _interopRequireDefault(require("@mui/icons-material/Send"));
var _socket = _interopRequireDefault(require("socket.io-client"));
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
function NewChatScreen(_ref) {
  let {
    chats,
    to_email
  } = _ref;
  const [textareaValue, setTextareaValue] = (0, _react.useState)("");
  const [sendingMessage, setSendingMessage] = (0, _react.useState)(false);
  const handleTextareaChange = e => {
    setTextareaValue(e.target.value);
  };
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000", {
    query: {
      Authorization: "Bearer ".concat(localStorage.getItem("token"))
    }
  }));

  // const sendMessage = () => {
  //   // const prefix = selectedPrefix || 'AC'; // Use 'AC' as the default prefix
  //   const message =textareaValue;
  //   console.log('werewehere 3nd time')
  //   //instead let's just make an api call
  //   // socket.emit('custom_event', message);
  //   setTextareaValue('');
  // };

  const sendMsgApi = async (payload, to_email) => {
    console.log("am I being payload", payload);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    try {
      const response = await fetch("http://192.168.1.10:8000/api/send_msg/".concat(to_email), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          msg: payload
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully sent msg", data);
      } else {
        console.log("Error sending msg");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      console.log("we can toggle loading if want");
      // setLoading(false);
    }
  };
  const handleSendMessage = async to_email => {
    if (textareaValue.trim() === "") {
      return; // Don't send empty messages
    } else {
      console.log("here istextareaValue", textareaValue);
      // sendMessage(textareaValue)
      const data = await sendMsgApi(textareaValue, to_email);
      console.log("herer sendmsgs", data);
      if (data) {
        setTextareaValue("");
      }
    }

    // Prepare the request body
    const requestBody = {
      msg: textareaValue
    };
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);

    // Update the UI to indicate sending
    setSendingMessage(true);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      "flex-direction": "column"
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
  }), /*#__PURE__*/_react.default.createElement(_Send.default, {
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === "Enter") {
        handleSendMessage(to_email);
      }
    },
    onClick: () => {
      handleSendMessage(to_email);
    },
    disabled: sendingMessage,
    style: {
      fontSize: "35px",
      color: "#1F4294"
    }
  })))));
}