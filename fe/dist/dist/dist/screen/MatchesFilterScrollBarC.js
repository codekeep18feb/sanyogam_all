"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MatchesFilterScrollBarC;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _material = require("@mui/material");
var _Chat = _interopRequireDefault(require("@mui/icons-material/Chat"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _WhatsApp = _interopRequireDefault(require("@mui/icons-material/WhatsApp"));
var _HorizontalScroll = _interopRequireDefault(require("../component/reusables/HorizontalScroll"));
var _PhotoCamera = _interopRequireDefault(require("@mui/icons-material/PhotoCamera"));
var _ManageSearch = _interopRequireDefault(require("@mui/icons-material/ManageSearch"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function MatchesFilterScrollBarC() {
  const useStyles = (0, _styles.makeStyles)(theme => ({
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
      // height: "100px",
      // width: '300px',
      marginRight: '10px',
      borderRadius: "10px",
      border: '1px solid #ccc',
      padding: '10px'
    },
    circle: {
      width: '80px',
      height: '80px',
      backgroundColor: 'white',
      // border: "2px solid grey",
      boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
      color: '#fff',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
      position: 'relative',
      padding: "20px"
    },
    greenDot: {
      width: '20px',
      height: '20px',
      backgroundColor: "white",
      boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
      borderRadius: '50%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: "5px"
    },
    profileTile: {
      paddingTop: "20px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
    },
    memberShipTile: {
      paddingTop: "20px",
      margin: "20px",
      borderRadius: "10px",
      background: 'linear-gradient(135deg, #9796F0 0%, #FBC7D4 100%)',
      color: "white"
    }
  }));
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_HorizontalScroll.default, null, /*#__PURE__*/_react.default.createElement(_ManageSearch.default, {
    className: classes.scrollItem
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "In Noida"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "In Delhi"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "Near Me"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "Newly joined"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "More Matches"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "Viewed Me"));
}