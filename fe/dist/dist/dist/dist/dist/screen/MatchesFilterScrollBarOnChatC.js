"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MatchesFilterScrollBarOnChatC;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _material = require("@mui/material");
var _Chat = _interopRequireDefault(require("@mui/icons-material/Chat"));
var _Call = _interopRequireDefault(require("@mui/icons-material/Call"));
var _WhatsApp = _interopRequireDefault(require("@mui/icons-material/WhatsApp"));
var _HorizontalScroll = _interopRequireDefault(require("../component/reusables/HorizontalScroll"));
var _PhotoCamera = _interopRequireDefault(require("@mui/icons-material/PhotoCamera"));
var _ManageSearch = _interopRequireDefault(require("@mui/icons-material/ManageSearch"));
var _ImageCircle = require("./chat_components/ImageCircle");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function MatchesFilterScrollBarOnChatC() {
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
  return /*#__PURE__*/_react.default.createElement(_HorizontalScroll.default, null, /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 1,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 2,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 2,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 4,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 5,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 6,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 7,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 8,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 9,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 10,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 11,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }), /*#__PURE__*/_react.default.createElement(_ImageCircle.ImageCircle, {
    dimention: 60,
    user: {
      name: "deepak..",
      id: 12,
      online: true,
      imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1"
    }
  }));
}