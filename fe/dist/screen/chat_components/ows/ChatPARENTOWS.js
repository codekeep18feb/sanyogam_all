"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _socket = _interopRequireDefault(require("socket.io-client"));
var _material = require("@mui/material");
var _UserChatTileInListCOWS = _interopRequireDefault(require("./UserChatTileInListCOWS"));
var _ChatsEditor = _interopRequireDefault(require("./ChatsEditor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChatPARENTOWS = () => {
  const [onlineProfiles, setOnlineProfiles] = (0, _react.useState)(null);
  const [with_userid, SetWithUserId] = (0, _react.useState)(null);
  const [with_email, SetWithEmail] = (0, _react.useState)(null);
  console.log("ChatPARENTOWS parent of profiles and chats");
  const [socket, setSocket] = (0, _react.useState)(_socket.default.connect("http://192.168.1.10:8000", {
    query: {
      Authorization: "Bearer ".concat(localStorage.getItem("token"))
    }
  }));
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const fetchOnlineProfiles = () => {
      console.log("fetching again");
      socket.emit("fetch_online_profiles");
    };
    fetchOnlineProfiles();
    const intervalId = setInterval(() => {
      console.log("Interval triggered");
      fetchOnlineProfiles();
    }, 10000);

    // Event listener for fetching online profiles
    socket.on("fetch_online_profiles", data => {
      if (data) {
        console.log("Data recdsfeived:", data, typeof data, onlineProfiles);
        const p_data = JSON.parse(data);
        setOnlineProfiles(prevOnlineProfiles => {
          if (!prevOnlineProfiles) {
            console.log("this should only be running once", onlineProfiles);
            setOnlineProfiles(p_data);
            setLoading(false);
          } else if (prevOnlineProfiles && p_data.length != prevOnlineProfiles.length) {
            console.log("wehrewrnrer");
            setOnlineProfiles(p_data);
            setLoading(false);
          }
          return prevOnlineProfiles;
        });
      }
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Include socket in the dependency array

  const all_online_profiles = onlineProfiles && /*#__PURE__*/_react.default.createElement(_UserChatTileInListCOWS.default, {
    profiles: onlineProfiles,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail
  });
  const chats_window = /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    gutterBottom: true
  }, "with_userid - ", with_userid, " - ", with_email), with_userid && /*#__PURE__*/_react.default.createElement(_ChatsEditor.default, {
    with_userid: with_userid
  })));
  console.log("this should only be running once as of now as we are setting the state only once", onlineProfiles);
  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 3
  }, !with_userid && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 4
  }, /*#__PURE__*/_react.default.createElement(_material.Paper, {
    style: {
      padding: 20,
      maxHeight: "80vh",
      overflow: "auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    gutterBottom: true
  }, "Online Profiles"), loading && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null), !loading && all_online_profiles && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, all_online_profiles))), with_userid && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    item: true,
    xs: 12,
    md: 8
  }, chats_window));
};
var _default = exports.default = ChatPARENTOWS;