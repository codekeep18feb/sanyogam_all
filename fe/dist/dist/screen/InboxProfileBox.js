"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _Chat = _interopRequireDefault(require("@mui/icons-material/Chat"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _WhatsApp = _interopRequireDefault(require("@mui/icons-material/WhatsApp"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _CameraAltRounded = _interopRequireDefault(require("@mui/icons-material/CameraAltRounded"));
var _Share = _interopRequireDefault(require("@mui/icons-material/Share"));
var _MoreHoriz = _interopRequireDefault(require("@mui/icons-material/MoreHoriz"));
var _react = _interopRequireWildcard(require("react"));
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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function InboxProfileBox(_ref) {
  let {
    imageUrl = "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
    email
  } = _ref;
  console.log("HERERISemail", email);
  const [bstate, setBstate] = (0, _react.useState)(null);
  const containerStyle = {
    display: "flex",
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
    height: "300px",
    width: "225px",
    borderRadius: "10px"
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
    justifyContent: "space-between"
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
  const buttonStyle = {
    padding: "10px 50px",
    borderRadius: "50px"
  };
  const respondConnectReq = async function () {
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
      console.log("successfully upASDFDSdate profiled", data);
    } else {
      console.log("Error updating profile");
    }
  };
  const handleRequest = async (e, action) => {
    e.preventDefault();
    console.log("we should send request to the user", email);
    if (action === "ACCEPTED") {
      setBstate("accepting");
      const res = await respondConnectReq(email, action);
      setBstate("accepted");
      console.log("herewqrewr", res);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...containerStyle,
      border: "1px green solid"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: bottomRowStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      ...textContainerStyle
    }
  }, "Pulkinboxit Soni (Noida)"), /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    onClick: e => handleRequest(e, "REJECTED"),
    style: {
      color: "white",
      borderRadius: "50%",
      padding: "5px",
      backgroundColor: "black",
      border: "2px solid white"
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    style: {
      ...buttonStyle
    },
    onClick: e => handleRequest(e, "ACCEPTED")
  }, bstate === "accepting" ? "accepting..." : bstate === "accepted" ? "accepted" : "Accept"))));
}
var _default = exports.default = InboxProfileBox;