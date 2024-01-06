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
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function HomeProfileBox(_ref) {
  let {
    imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
    fullname,
    current_location,
    email
  } = _ref;
  const [bstate, setBstate] = (0, _react.useState)(null);
  const containerStyle = {
    padding: "5px 16px",
    // textAlign: "left",
    // padding: "5px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    height: "450px",
    width: "325px",
    borderRadius: "5px",
    overflow: "hidden",
    // Hide overflow
    margin: "0 auto"
  };
  const backgroundImageStyle = {
    content: "''",
    position: "absolute",
    top: "5%",
    // left: "0",
    width: "90%",
    // margin:"0 auto",
    height: "100%",
    // Set the pseudo-element's height to 80%
    backgroundImage: "url(".concat(imageUrl, ")"),
    backgroundSize: "cover",
    zIndex: "-1"
  };
  const cameraCover = {
    display: "flex",
    background: "rgba(255, 0, 153, 1)",
    borderRadius: "10px",
    padding: "0 7px 0 5px",
    justifyContent: "center"
  };
  const iconText = {
    // color:"white"
    paddingTop: "10px"
  };
  const topRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "10%"
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
    // width: "50%",
    marginLeft: "20px"
    // border: "1px solid red"
    // position: "absolute",
    // bottom: "5px",
    // left: "5px",
  };
  const iconContainerStyle = {
    backgroundColor: "rgba(255, 0, 153, 1)",
    borderRadius: "50%",
    padding: "2px",
    margin: "5px",
    height: "20px",
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const textContainerStyle = {
    paddingLeft: "20px"
  };
  const flexContainerStyle = {
    display: "flex",
    alignItems: "center"
  };
  const circleStyle = {
    color: "green",
    borderRadius: "50%",
    padding: "2px",
    backgroundColor: "white"
  };
  const sendRequest = async () => {
    console.log("we should send request to the user", email);
    setBstate("sending");
    const res = await sendConnectReq(email, "SENT");
    setBstate("sent");
    console.log("herewqrewr", res);
  };
  const sendConnectReq = async function () {
    let to_email_nr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    console.log("whasdsdtsdfer", action, to_email_nr);
    // console.log('onsave ran here we can see the ',{family_info:formValues})
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    const response = await fetch("http://127.0.0.1:8000/api/handle_request?to_email=".concat(to_email_nr, "&action=").concat(action), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    if (response.status === 200) {
      const data = await response.json();
      // nagivate(-1);

      console.log("successfully upASDFDSdate profiled", data);
      //   const arrayOfObjects = [
      //     { "key1": "value1a", "key2": "value2a" },
      //     { "key1": "value1b", "key2": "value2b" },
      //     // Add more objects as needed
      // ];

      // Specify the keys to merge
      // const key1ToMerge = "user_fname";
      // const key2ToMerge = "user_lname";

      // // Use map to create a new array with merged keys
      // const newArray = data.map(obj => ({
      //     ...obj,
      //     fullname: `${obj[key1ToMerge]} ${obj[key2ToMerge]}`,
      //     // Optionally, you can exclude the original keys if needed
      //     [key1ToMerge]: undefined,
      //     [key2ToMerge]: undefined,
      // }));

      // // Display the modified array of objects
      // console.log(newArray);
      // setdata(newArray)
    } else {
      console.log("Error updating profile");
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...containerStyle,
      color: "white"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...topRowStyle,
      paddingRight: "10px"
    }
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
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      padding: "10px 30px 0 0"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
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
  }, "3"))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...bottomRowStyle,
      marginLeft: "15px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle
    }
  }, fullname, " (", current_location, ")"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle,
      fontSize: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, "32 yrs. 5'5\" Sonal")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle,
      paddingBottom: "10px"
    }
  }, "Software Developer"), /*#__PURE__*/_react.default.createElement("div", {
    style: actionRow
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...flexContainerStyle,
      flexDirection: "column",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Chat.default, {
    style: {
      ...circleStyle
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement(_Call.default, {
    style: {
      ...circleStyle
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement(_WhatsApp.default, {
    style: {
      ...circleStyle
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...iconText
    }
  }, "WhatsApp")))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    color: "primary",
    sx: {
      marginLeft: "20px",
      width: "100%"
    },
    onClick: () => sendRequest()
  }, bstate === "sending" ? "sending..." : bstate === "sent" ? "sent" : "send request")), /*#__PURE__*/_react.default.createElement("div", {
    style: backgroundImageStyle
  }));
}
var _default = exports.default = HomeProfileBox;