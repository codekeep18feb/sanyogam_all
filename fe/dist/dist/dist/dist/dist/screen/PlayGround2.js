"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlayGround2;
var _react = _interopRequireDefault(require("react"));
var _HorizontalScroll = _interopRequireDefault(require("../component/reusables/HorizontalScroll"));
var _styles = require("@material-ui/core/styles");
var _ProfileBriefTile = _interopRequireDefault(require("./ProfileBriefTile"));
var _ProgressBar = _interopRequireDefault(require("../component/reusables/ProgressBar"));
var _material = require("@mui/material");
var _ImageCircle = require("./chat_components/ImageCircle");
var _MatchesFilterScrollBarOnChatC = _interopRequireDefault(require("./MatchesFilterScrollBarOnChatC"));
var _MyWSComponent = _interopRequireDefault(require("../../src/screen/chat_components/MyWSComponent"));
var _MonitorWSStatus = _interopRequireDefault(require("../component/MonitorWSStatus"));
var _ListnerWS = _interopRequireDefault(require("../component/ListnerWS2"));
var _PhoneCallUI = _interopRequireDefault(require("./PhoneCallUI"));
var _SendMsgWS = _interopRequireDefault(require("../component/SendMsgWS"));
var _ChatsEditor = _interopRequireDefault(require("./chat_components/ows/ChatsEditor"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
function PlayGround2() {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ListnerWS.default, null), /*#__PURE__*/_react.default.createElement(_SendMsgWS.default, null))
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