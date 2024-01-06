"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _AuthAction = require("../redux/counter/AuthAction");
var _reactRouterDom = require("react-router-dom");
var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Home = _interopRequireDefault(require("@mui/icons-material/Home"));
var _People = _interopRequireDefault(require("@mui/icons-material/People"));
var _MailOutline = _interopRequireDefault(require("@mui/icons-material/MailOutline"));
var _QuestionAnswer = _interopRequireDefault(require("@mui/icons-material/QuestionAnswer"));
var _AttachMoney = _interopRequireDefault(require("@mui/icons-material/AttachMoney"));
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
function BottomMobile(_ref) {
  let {
    auth_data,
    logout
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-around' // Equal spacing between items
  };
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
  };
  const handleLogout = async () => {
    // ... (unchanged)
  };
  return /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "static",
    sx: {
      background: 'linear-gradient(270.06deg, rgba(46, 27, 254, 0.74) 5.67%, #FF0099 75.76%)'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: headerStyle
  }, auth_data && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_Home.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Home"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/all_users",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_People.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Matches"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/inbox",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_MailOutline.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Inbox"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/chat",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_QuestionAnswer.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Chat"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/pricing",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_AttachMoney.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Premium"))))));
}
const mapStateToProps = state => {
  return {
    auth_data: state.auth.data
  };
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  logout: _AuthAction.logout
})(BottomMobile);