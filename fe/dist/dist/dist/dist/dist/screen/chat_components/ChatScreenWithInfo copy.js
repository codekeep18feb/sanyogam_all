"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChatScreenWithInfo;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _VideoCall = _interopRequireDefault(require("@mui/icons-material/VideoCall"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _ChatScreen = _interopRequireDefault(require("./ChatScreen"));
var _RequestScreen = _interopRequireDefault(require("../RequestScreen"));
var _ImageCircle = require("../chat_components/ImageCircle");
var _NewChatScreen = _interopRequireDefault(require("./NewChatScreen"));
var _DetachVideoWindow = _interopRequireDefault(require("../../screen/video_components/DetachVideoWindow"));
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
function ChatScreenHeader(_ref) {
  let {
    setvideoView,
    with_userid,
    with_email,
    SetWithUserId,
    SetWithEmail,
    onBackClick,
    user
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 1
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    onClick: onBackClick,
    style: {
      cursor: "pointer"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 50,
    user: user
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    color: "textPrimary",
    align: "center",
    noWrap: true
  }, user.name), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: user.online ? "#00E676" : "inherit",
      align: "left",
      fontSize: 12
    }
  }, user.online ? "Online" : "")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_Call.default, {
    style: {
      fontSize: "35px",
      color: "#1F4294"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_VideoCall.default, {
    onClick: e => {
      e.preventDefault();
      console.log("make video call", with_userid, with_email);
      setvideoView(true);
      // <DetachVideoWindow with_email={with_email} with_userid={with_userid} />
      // SetWithUserId
    },
    style: {
      fontSize: "35px",
      color: "#1F4294"
    }
  })));
}
function ChatScreenWithInfo(_ref2) {
  let {
    with_userid,
    SetWithUserId,
    SetWithEmail,
    requestStatus,
    connection_open,
    with_email,
    chats,
    sendMsg
  } = _ref2;
  const [videoView, setvideoView] = (0, _react.useState)(false);
  console.log("ABCDEF1", videoView);

  // useEffect(() => {
  //   if (!connection_open){

  //   }
  // }, [videoView])

  const user = {
    id: 1,
    name: "Pulkit Ssdasdfasdfsdafsadf",
    imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1",
    online: true
  };
  const handleBackClick = () => {
    console.log("onclose clicked");
    SetWithUserId(null);
  };
  const renderContent = () => {
    console.log("ABCDEF2");
    if (requestStatus === "ACCEPTED" && connection_open) {
      if (videoView) {
        console.log("wasconnected!", connection_open);
        return /*#__PURE__*/(
          // <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
          // <DetachVideoWindow connection_open={connection_open} with_email={with_email} with_userid={with_userid} />
          _react.default.createElement("div", null, "VIdeoVIewhere")
        );
      } else {
        return /*#__PURE__*/(
          // <ChatScreen with_email={with_email} chats={chats} sendMsg={sendMsg} />
          _react.default.createElement(_NewChatScreen.default, {
            chats: chats,
            sendMsg: sendMsg
          })
        );
      }
    } else if (requestStatus && requestStatus !== "ACCEPTED") {
      return /*#__PURE__*/_react.default.createElement(_RequestScreen.default, {
        with_email: with_email
      });
    } else if (!connection_open) {
      return /*#__PURE__*/_react.default.createElement("div", null, "Opening the connection...");
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "Unhandled Case");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: e => {
      e.preventDefault();
      // force close the connection
      // let's catch the ref
      console.log("myCurrerref", myRef.current);
      myRef.current.channel.close();
    }
  }, "forcecloseconnection", " "), /*#__PURE__*/_react.default.createElement(ChatScreenHeader, {
    setvideoView: setvideoView,
    with_userid: with_userid,
    with_email: with_email,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail,
    onBackClick: handleBackClick,
    user: user
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "29yrs, Lucknow"), /*#__PURE__*/_react.default.createElement("div", null, "Teacher")), renderContent());
}