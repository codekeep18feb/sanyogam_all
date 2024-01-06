"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
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
const SendMsgWS = () => {
  // const [socket, setSocket] = useState(
  //   io.connect('http://192.168.1.10:8000')
  // );
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000", {
    query: {
      Authorization: "Bearer ".concat(localStorage.getItem("token"))
    }
  }));

  // const [socket, setSocket] = useState(io.connect('http://192.168.1.10:8000'));
  const [messages, setMessages] = (0, _react.useState)([]);
  const [messageInput, setMessageInput] = (0, _react.useState)("");
  const [room_id, setRoomId] = (0, _react.useState)("");
  const [selectedPrefix, setSelectedPrefix] = (0, _react.useState)(null);
  const handlePrefixChange = event => {
    setSelectedPrefix(event.target.value);
  };
  const sendMessage = () => {
    // const prefix = selectedPrefix || 'AC'; // Use 'AC' as the default prefix
    const message = messageInput;
    console.log("werewehere 2nd time");
    socket.emit("listen_global_events");
    setMessageInput("");
    setRoomId("");
  };
  _react.default.useEffect(() => {
    socket.on("listen_global_events", data => {
      console.log("do we see this here after", data);
      // setMessages([...messages, data]);
    });

    // return () => {
    //   socket.disconnect();
    // console.log('will it only run if unmounting is happening')
    // };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "WebSocket Echo"), /*#__PURE__*/_react.default.createElement("ul", null, messages.map((message, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index
  }, message))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "prefix",
    value: "AC",
    defaultChecked: selectedPrefix === null || selectedPrefix === "AC",
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
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: room_id,
    onChange: e => setRoomId(e.target.value),
    placeholder: "Type room_id"
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      e.preventDefault();
      sendMessage();
    }
  }, "Send"));
};
var _default = exports.default = SendMsgWS;