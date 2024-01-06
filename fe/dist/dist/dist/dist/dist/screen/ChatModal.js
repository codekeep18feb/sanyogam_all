"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _VideoCall = _interopRequireDefault(require("@mui/icons-material/VideoCall"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _ChatWindow = _interopRequireDefault(require("./chat_components/ChatWindow"));
var _ImageCircle = require("./chat_components/ImageCircle");
var _material = require("@mui/material");
var _core = require("@material-ui/core");
var _RequestScreen = _interopRequireDefault(require("./RequestScreen"));
var _NewChatScreen = _interopRequireDefault(require("./chat_components/NewChatScreen"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const ChatModal = _ref => {
  let {
    SetWithUserId,
    with_userid,
    with_email
  } = _ref;
  console.log('DODFSDF', SetWithUserId);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "white"
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 1,
    alignItems: "flex-start"
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    onClick: () => {
      console.log('onclose clicked');
      SetWithUserId(null);
    },
    style: {
      cursor: "pointer"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 50,
    user: {
      id: 1,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    color: "textPrimary",
    align: "center",
    noWrap: true
  }, "Pulkit Ssdasdfasdfsdafsadf#00E676"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: "#00E676",
      align: "left",
      fontSize: 12
    }
  }, "Online")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
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
    style: {
      fontSize: "35px",
      color: "#1F4294"
    }
  })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "29yrs, Lucknow"), /*#__PURE__*/_react.default.createElement("div", null, "Teacher")), /*#__PURE__*/_react.default.createElement(_RequestScreen.default, {
    with_email: with_email
  }), /*#__PURE__*/_react.default.createElement(_NewChatScreen.default, {
    chats: null,
    sendMsg: text => {
      console.log('sendmsg was called', text);
    }
  }));
};
var _default = exports.default = ChatModal;