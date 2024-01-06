"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _Chat = _interopRequireDefault(require("@mui/icons-material/Chat"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _WhatsApp = _interopRequireDefault(require("@mui/icons-material/WhatsApp"));
var _CameraAltRounded = _interopRequireDefault(require("@mui/icons-material/CameraAltRounded"));
var _Share = _interopRequireDefault(require("@mui/icons-material/Share"));
var _MoreHoriz = _interopRequireDefault(require("@mui/icons-material/MoreHoriz"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function MatchesProfileBox(_ref) {
  let {
    imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2"
  } = _ref;
  const containerStyle = {
    margin: "5px 5px",
    textAlign: "left",
    backgroundColor: "whitesmoke",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    backgroundImage: "url(".concat(imageUrl, ")"),
    backgroundSize: "cover",
    height: "450px",
    width: "325px",
    borderRadius: "5px"
  };
  const cameraCover = {
    display: "flex",
    background: "rgba(255, 0, 153, 1)",
    borderRadius: "10px",
    padding: "0 7px 0 5px",
    justifyContent: "center"
  };
  const iconText = {
    color: "white"
  };
  const topRowStyle = {
    display: "flex",
    // justifyContent: "space-between",
    width: "100%"
    // position: "absolute",
    // top: "5px",
    // right: "5px",
  };
  const bottomRowStyle = {
    // display: "flex",
    // justifyContent: "space-between",
    // width: "50%",
    position: "absolute",
    bottom: "10px",
    left: "5px",
    "line-height": 8 /* You can adjust this value as needed */
  };
  const actionRow = {
    display: "flex",
    justifyContent: "space-between",
    width: "50%"
    // position: "absolute",
    // bottom: "5px",
    // left: "5px",
  };
  const iconContainerStyle = {
    backgroundColor: "rgba(255, 0, 153, 1)",
    borderRadius: "50%",
    padding: "2px",
    height: "20px",
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const textContainerStyle = {
    color: "white"
    // padding: "5px",
  };
  const flexContainerStyle = {
    display: "flex",
    alignItems: "center"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: topRowStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: iconContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_material.Icon, {
    component: _Share.default,
    style: {
      color: "blue",
      backgroundColor: "white",
      borderRadius: "50%"
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: iconContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_material.Icon, {
    component: _MoreHoriz.default,
    style: {
      color: "white",
      backgroundColor: "rgba(255, 0, 153, 1)",
      borderRadius: "50%"
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...cameraCover
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Icon, {
    component: _CameraAltRounded.default,
    style: {
      color: "white"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: "white",
      marginLeft: "3px",
      marginTop: "1px"
    }
  }, "3")), /*#__PURE__*/_react.default.createElement("div", {
    style: bottomRowStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle
    }
  }, "Pulkit Pulkdfasdit (Noida)"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle,
      fontSize: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, "32 yrs. 5'5\" Sonal")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle,
      paddingBottom: "10px"
    }
  }, "Software Developer")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...actionRow
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...flexContainerStyle,
      flexDirection: "column",
      textAlign: "center",
      border: "1px solid white"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: "50%",
      padding: "2px",
      backgroundColor: "white",
      color: "red",
      height: "50px",
      width: "50px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Chat.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...iconText
    }
  }, "Chat")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...flexContainerStyle,
      flexDirection: "column",
      marginLeft: "30px",
      marginRight: "30px",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: "50%",
      padding: "2px",
      backgroundColor: "white",
      color: "red",
      height: "50px",
      width: "50px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Call.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...iconText
    }
  }, "Call")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...flexContainerStyle,
      flexDirection: "column",
      textAlign: "center",
      paddingBottom: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: "50%",
      padding: "2px",
      backgroundColor: "white",
      color: "red",
      height: "50px",
      width: "50px"
    }
  }, /*#__PURE__*/_react.default.createElement(_WhatsApp.default, {
    style: {
      color: "green",
      borderRadius: "50%",
      padding: "2px",
      backgroundColor: "white"
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...iconText
    }
  }, "WhatsApp")))));
}
var _default = exports.default = MatchesProfileBox;