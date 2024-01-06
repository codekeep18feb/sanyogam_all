"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _UserChatTileInListC = _interopRequireDefault(require("../UserChatTileInListC"));
var _ChatWindow = _interopRequireDefault(require("./ChatWindow"));
var _reactRedux = require("react-redux");
var _TabPanel = _interopRequireDefault(require("../TabPanel"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Hidden = _interopRequireDefault(require("@mui/material/Hidden"));
var _ImageCircle = _interopRequireDefault(require("./ImageCircle"));
var _BlankChatScreen = _interopRequireDefault(require("./BlankChatScreen"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import Grid
// Import Hidden

function Chat(_ref) {
  let {
    auth_data
  } = _ref;
  const [profiles, setProfiles] = (0, _react.useState)([]);
  const [online_profiles, setOnlineProfiles] = (0, _react.useState)([]);
  const [with_userid, SetWithUserId] = (0, _react.useState)(null);
  const [with_email, SetWithEmail] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  // const [rtcData, setRTCData] = useState(null);
  console.log("DOWE HAVE ANY", with_userid, with_email);
  const users = [{
    id: 1,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 2,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 3,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 4,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 5,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 6,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 7,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 8,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 9,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 10,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 11,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 12,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 13,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 14,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 15,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 16,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 17,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 18,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 19,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/profile_images/1.jpg",
    online: true
  }, {
    id: 20,
    imageUrl: "https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg",
    online: false
  }
  // Add more user objects as needed
  ];

  // console.log("is it rerendering.?? mutiple times",rtcData)
  const fetchData = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    try {
      const response = await fetch("http://192.168.1.10:8000/api/read_online_circle", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        setOnlineProfiles(data);
        // setLoading(false);
      } else {
        console.log("Error occurred while fetching profiles.");
        // setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // setLoading(false);
    }
  };
  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    try {
      const response = await fetch("http://192.168.1.10:8000/api/rtc_user_info_by_id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        // setRTCData(data);
        console.log("datsdafsdaa", data);
      } else {
        console.log("Error fetching chat history");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(async () => {
    // fetchData(); // Fetch data initially
    // console.log("main useeffect ran")

    // const intervalId = setInterval(() => {
    //   fetchData(); // Fetch data every 10 seconds
    // }, 10000);

    // Fetch data from the /api/profiles endpoint
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
    // console.log("new online profiles arrived",online_profiles)
    // here will make the changes to profiles's online state
    // if online_profiles has items and not just empty
    // in that case let's create two arrays
    // offline_profiles -> items of profiles where email is not in online_profiles
    // online_profiles -> items of profiles where email is in online_profiles
    //now let's loop through these two arrays offline_profiles and online_profiles and update the online status in profiles using setProfiles

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
    return /*#__PURE__*/_react.default.createElement("p", null, "Loang...");
  }
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ImageCircle.default, {
    users: users
  }), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    md: 3
  }, /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    profiles: profiles,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail,
    with_userid: with_userid
  })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    md: 7
  }, /*#__PURE__*/_react.default.createElement("div", null, with_userid ? /*#__PURE__*/_react.default.createElement(_ChatWindow.default, {
    with_email: with_email,
    with_userid: with_userid
  }) : /*#__PURE__*/_react.default.createElement(_BlankChatScreen.default, null)))));
}
const mapStateToProps = state => {
  console.log("grab auth outof it", state.auth.data);
  return {
    auth_data: state.auth.data // Assuming you have a reducer that manages a "count" property
  };
};

// export default Chat;
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Chat);