"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _UserChatTileInListC = _interopRequireDefault(require("../UserChatTileInListC"));
var _VideoWindow = _interopRequireDefault(require("./VideoWindow"));
var _reactRedux = require("react-redux");
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
function Video(_ref) {
  let {
    auth_data
  } = _ref;
  const [profiles, setProfiles] = (0, _react.useState)([]);
  const [online_profiles, setOnlineProfiles] = (0, _react.useState)([]);
  const [with_userid, SetWithUserId] = (0, _react.useState)(null);
  const [with_email, SetWithEmail] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  // const [rtcData, setRTCData] = useState(null);

  (0, _react.useEffect)(async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    console.log("token", token);
    const response2 = await fetch("http://192.168.1.10:8000/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token // Replace with your JWT token
      },
      body: JSON.stringify({})
    });
    if (response2.status === 200) {
      const data = await response2.json();
      console.log("data", data);
      setProfiles(data);
      setLoading(false);
      // fetchRTCUserInfo()
    } else {
      console.log("error occured!");
      // setError('Peopleissu');
      setLoading(false);
    }
  }, [with_userid]);
  (0, _react.useEffect)(() => {
    console.log("new online profiles arrived", online_profiles, profiles);

    // Check if online_profiles has items and is not empty
    if (online_profiles.length > 0) {
      // Create a set of online email addresses for faster lookup
      const onlineEmailsSet = new Set(online_profiles);

      // Update the online status in profiles using setProfiles
      const updatedProfiles = profiles.map(profile => {
        if (onlineEmailsSet.has(profile.user_email)) {
          return {
            ...profile,
            online: true
          };
        } else {
          return {
            ...profile,
            online: false
          };
        }
      });
      console.log("updatedProfiles are they not changnin", updatedProfiles);
      // Set the updated profiles
      setProfiles(updatedProfiles);
    }
  }, [online_profiles]);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("p", null, "oading...");
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_UserChatTileInListC.default, {
    profiles: profiles,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail,
    with_userid: with_userid
  })), /*#__PURE__*/_react.default.createElement("div", null, with_userid ? /*#__PURE__*/_react.default.createElement(_VideoWindow.default, {
    with_email: with_email,
    with_userid: with_userid
  }) : "loading..."));
}
const mapStateToProps = state => {
  console.log("grab auth outof it", state.auth.data);
  return {
    auth_data: state.auth.data // Assuming you have a reducer that manages a "count" property
  };
};

// export default Video;
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Video);