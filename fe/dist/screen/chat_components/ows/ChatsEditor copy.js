"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _socket = _interopRequireDefault(require("socket.io-client"));
var _material = require("@mui/material");
var _NewChatScreen = _interopRequireDefault(require("./NewChatScreen"));
var _VideoOWS = _interopRequireDefault(require("./VideoOWS"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SocketWrapperFetchProfiles = _ref => {
  let {
    with_userid,
    handleFetchedData,
    children
  } = _ref;
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.150.32:8000", {
    query: {
      Authorization: "Bearer ".concat(localStorage.getItem("token"))
    }
  }));
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const fetchOnlineProfiles = () => {
      socket.emit("fetch_profile_chats");
    };
    fetchOnlineProfiles();
    const intervalId = setInterval(() => {
      fetchOnlineProfiles();
    }, 100000000);
    const handleFetchProfileChats = data => {
      if (data) {
        const pdata = JSON.parse(data);
        const f_data = pdata.filter(i => i.frm_user === with_userid || i.to_user === with_userid);
        handleFetchedData(f_data);
        setLoading(false);
      }
    };
    socket.on("fetch_profile_chats", handleFetchProfileChats);
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => {
      clearInterval(intervalId);
      socket.off("fetch_profile_chats", handleFetchProfileChats);
    };
  }, [socket, with_userid, handleFetchedData]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};
const ChatsEditor = _ref2 => {
  let {
    with_email,
    with_userid
  } = _ref2;
  const [allChats, setAllChats] = (0, _react.useState)(null);
  const [videoChat, setvideoChat] = (0, _react.useState)(false);
  const handleFetchedData = data => {
    setAllChats(data);
  };
  return /*#__PURE__*/_react.default.createElement(SocketWrapperFetchProfiles, {
    with_userid: with_userid,
    handleFetchedData: handleFetchedData
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "all chats"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: e => {
      e.preventDefault();
      setvideoChat(true);
    }
  }, "Video Chat"), !with_userid && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null), with_userid && !videoChat && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, allChats && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_NewChatScreen.default, {
    chats: allChats,
    sendMsg: () => {}
  }))), with_userid && with_email && videoChat && /*#__PURE__*/_react.default.createElement(_VideoOWS.default, {
    with_userid: with_userid,
    with_email: with_email
  })));
};
var _default = exports.default = ChatsEditor;