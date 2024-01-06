"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserChatTileInListCOWS;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _ImageCircle = require("./ImageCircle");
var _material = require("@mui/material");
var _Phone = _interopRequireDefault(require("@mui/icons-material/Phone"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function UserChatTileInListCOWS(_ref) {
  let {
    profiles,
    SetWithEmail,
    SetWithUserId,
    with_userid
  } = _ref;
  //here will make the call for user online status
  console.log("profileswhatisit?", profiles);
  return /*#__PURE__*/_react.default.createElement("div", null, profiles && profiles.map(profile => {
    console.log("dsfdsfprofile.online", profile.online, typeof profile.online, profile.online === "True");
    const onlines = profile.online === "True";
    return /*#__PURE__*/_react.default.createElement("div", {
      key: profile.id,
      onClick: () => {
        SetWithUserId(profile.id);
        SetWithEmail(profile.user_email);
      }
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      alignItems: "center",
      justifyContent: "center"
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 2
    }, /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
      dimention: 50,
      user: {
        id: profile.id,
        online: onlines,
        imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
      }
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 7
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "end",
        justifyContent: "center"
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, profile.user_fname, " ", profile.user_lname), /*#__PURE__*/_react.default.createElement(_material.Icon, {
      component: _Phone.default,
      style: {
        color: "blue",
        backgroundColor: "white",
        borderRadius: "50%"
      }
    }), /*#__PURE__*/_react.default.createElement("div", null)), /*#__PURE__*/_react.default.createElement(_core.Typography, {
      variant: "subtitle2"
    }, "Has Messsged You!"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/_react.default.createElement("div", null, "10:20 AM"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "2")))));
  }));
}