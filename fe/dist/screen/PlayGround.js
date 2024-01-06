"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlayGround;
var _react = _interopRequireWildcard(require("react"));
var _HorizontalScroll = _interopRequireDefault(require("../component/reusables/HorizontalScroll"));
var _styles = require("@material-ui/core/styles");
var _ProfileBriefTile = _interopRequireDefault(require("./ProfileBriefTile"));
var _ProgressBar = _interopRequireDefault(require("../component/reusables/ProgressBar"));
var _material = require("@mui/material");
var _ImageCircle = require("./chat_components/ImageCircle");
var _MatchesFilterScrollBarOnChatC = _interopRequireDefault(require("./MatchesFilterScrollBarOnChatC"));
var _MyWSComponent = _interopRequireDefault(require("../../src/screen/chat_components/MyWSComponent"));
var _MonitorWSStatus = _interopRequireDefault(require("../component/MonitorWSStatus"));
var _ListnerWS = _interopRequireDefault(require("../component/ListnerWS1"));
var _SendMsgWS = _interopRequireDefault(require("../component/SendMsgWS"));
var _RoomFeature = _interopRequireDefault(require("./RoomFeature"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useStyles = (0, _styles.makeStyles)({
  scrollContainer: {
    overflow: 'hidden',
    width: '100%',
    touchAction: 'pan-y'
  },
  innerContainer: {
    display: 'flex',
    whiteSpace: 'nowrap'
  },
  scrollItem: {
    flexShrink: 0,
    height: "100px",
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px'
  }
});
function ChatTestLayout() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    style: {
      textAlign: "center"
    },
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: 0,
      backgroundColor: "#FF0099",
      color: "white",
      padding: "20px 0 20px 0"
    }
  }, "Recent")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: 0,
      backgroundColor: "white",
      color: "#FF0099",
      padding: "20px 0 20px 0"
    }
  }, "Active"))), /*#__PURE__*/_react.default.createElement("div", null, "My Matches"), /*#__PURE__*/_react.default.createElement(_MatchesFilterScrollBarOnChatC.default, null));
}
const MyComponent = () => {
  const [userData, setUserData] = (0, _react.useState)({
    name: 'John',
    age: 25,
    hobbies: ['Reading', 'Gaming']
  });
  const updateHobbies = () => {
    // Check if the 'hobbies' property exists in the current state
    if ('hobbies' in userData) {
      // Using the functional form of setState to conditionally update the state
      setUserData(prevUserData => {
        // Creating a new object with the same properties as the previous state
        // Updating the 'hobbies' property only if it exists
        return {
          ...prevUserData,
          hobbies: [...prevUserData.hobbies, 'Traveling']
        };
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Name: ", userData.name), /*#__PURE__*/_react.default.createElement("p", null, "Age: ", userData.age), /*#__PURE__*/_react.default.createElement("p", null, "Hobbies: ", userData.hobbies.join(', ')), /*#__PURE__*/_react.default.createElement("button", {
    onClick: updateHobbies
  }, "Add Hobby"));
};
function PlayGround() {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MyComponent, null))
  // <ImageCircle user={{id:1,online:true}} />

  // <HorizontalScroll >
  //   <div className={classes.scrollItem}>Content 1</div>
  //   <div className={classes.scrollItem}>Content 2</div>
  //   <div className={classes.scrollItem}>Content 3</div>
  // </HorizontalScroll>

  // <ProfileBriefTile />
  // <TextField
  //       id="brother-number"
  //       label="No Of Brothers"
  //       type="number"
  //       InputLabelProps={{
  //         shrink: true,
  //       }}
  //       variant="standard"
  //     />
  ;
}