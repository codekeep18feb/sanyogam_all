"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChatsOWSTile;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _ImageCircle = require("./ImageCircle");
var _material = require("@mui/material");
var _Phone = _interopRequireDefault(require("@mui/icons-material/Phone"));
var _NewChatScreen = _interopRequireDefault(require("./NewChatScreen"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ChatsOWSTile(_ref) {
  let {
    chats
  } = _ref;
  //here will make the call for user online status
  const sendMsg = msg => {
    console.log('here is msg we should send to the user', msg);
    console.log('probably wanna make an entry??');
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      border: "1px solid red"
    }
  }, /*#__PURE__*/_react.default.createElement(_NewChatScreen.default, {
    chats: chats,
    sendMsg: sendMsg
  }));
}