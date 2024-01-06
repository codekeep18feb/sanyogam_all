"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageCircle = ImageCircle;
exports.default = Home;
var _react = _interopRequireDefault(require("react"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Vector = _interopRequireDefault(require("../images/Vector.jpg"));
var _material = require("@mui/material");
var _styles = require("@material-ui/core/styles");
var _ProgressBar = _interopRequireDefault(require("../component/reusables/ProgressBar"));
var _PhotoCamera = _interopRequireDefault(require("@mui/icons-material/PhotoCamera"));
var _AllMatchesScrollBarC = _interopRequireDefault(require("./AllMatchesScrollBarC"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
// import CameraIcon from "@mui/icons-material/CameraAltRounded";
// import ShareRIcon from "@mui/icons-material/Share";
// import MenuIcon from "@mui/icons-material/MoreHoriz";

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
    width: '300px',
    marginRight: '10px',
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
const iconText = {
  color: "black"
};
const flexContainerStyle = {
  display: "flex",
  alignItems: "center"
};
const actionRow = {
  display: "flex",
  justifyContent: "space-between",
  width: "50%"
  // position: "absolute",
  // bottom: "5px",
  // left: "5px",
};
function ImageCircle(_ref) {
  let {
    user
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.circle
  }, user.online && /*#__PURE__*/_react.default.createElement(_PhotoCamera.default, {
    className: classes.greenDot,
    style: {
      fontSize: '24px',
      color: 'skyblue'
    }
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: _Vector.default,
    alt: "Circle Image",
    width: "60",
    height: "60"
  }));
}
function Home(_ref2) {
  let {
    users,
    profile = {
      name: "Mona Soni (BPSADSFSG151)"
    }
  } = _ref2;
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.profileTile
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(ImageCircle, {
    user: {
      "online": true
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, profile.name)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "10px",
      opacity: 0.8
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "back_tile",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, "Edit Profile"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingTop: "20px",
      width: "90%",
      margin: "0 auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
    totalWorkDone: [0.5, 0.2, 0.3, 0.8, 1]
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right",
      padding: "15px",
      color: "blue"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "button"
  }, "Update Now"))), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.memberShipTile
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "Talk To Your matches"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "at 60% off")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "basic plat at \u20B9 499 was \u20B9831")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "10px",
      opacity: 0.8
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "View Contact No"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "Chat With Your Matches"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "Whatsapp your Matches")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    color: "secondary"
  }, "Go Premium"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "40px 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_AllMatchesScrollBarC.default, null)));
}