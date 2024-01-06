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
var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Home = _interopRequireDefault(require("@mui/icons-material/Home"));
var _People = _interopRequireDefault(require("@mui/icons-material/People"));
var _MailOutline = _interopRequireDefault(require("@mui/icons-material/MailOutline"));
var _QuestionAnswer = _interopRequireDefault(require("@mui/icons-material/QuestionAnswer"));
var _AttachMoney = _interopRequireDefault(require("@mui/icons-material/AttachMoney"));
var _Language = _interopRequireDefault(require("@mui/icons-material/Language"));
var _Notifications = _interopRequireDefault(require("@mui/icons-material/Notifications"));
var _MoreHoriz = _interopRequireDefault(require("@mui/icons-material/MoreHoriz"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _Menu = _interopRequireDefault(require("@mui/material/Menu"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function HeaderDesktop(_ref) {
  let {
    auth_data,
    logout
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center" // Align items vertically
  };
  const centerOptionsStyle = {
    display: "flex",
    justifyContent: "center",
    // Center align horizontally
    alignItems: "center" // Align items vertically
  };
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    marginRight: "16px"
  };
  const handleLogout = async () => {
    try {
      // Send a POST request to your server with the form data
      logout();
      const JWT_TOKEN = localStorage.getItem("token");
      const token = "Bearer ".concat(JWT_TOKEN);
      console.log("token", token);
      const response = await fetch("http://192.168.1.10:8000/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token // Replace with your JWT token
        }
      });
      if (response.ok) {
        // If the POST request is successful, navigate to the "/login" route
        // navigate('/login');
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        // Handle error response here (e.g., display an error message)
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLanguageChange = event => {
    // Handle language change here
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "static",
    sx: {
      background: "linear-gradient(270.06deg, rgba(46, 27, 254, 0.74) 5.67%, #FF0099 75.76%)"
    }
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    style: {
      marginRight: "auto",
      fontFamily: "cursive"
    }
  }, "NormVinod.com"), /*#__PURE__*/_react.default.createElement("div", {
    style: headerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: centerOptionsStyle
  }, auth_data && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_Home.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Home"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/all_users",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_People.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Matches"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/inbox",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_MailOutline.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Inbox"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/chat",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_QuestionAnswer.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Chat"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/pricing",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_AttachMoney.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Pricing"))), auth_data &&
  /*#__PURE__*/
  // Display "Notifications" only when the user is logged in
  _react.default.createElement(_Button.default, {
    color: "inherit"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/notifications",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement(_Notifications.default, null), /*#__PURE__*/_react.default.createElement("div", null, "Notifications"))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/language",
    style: linkStyle
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: "Eng",
    onChange: handleLanguageChange
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "Eng"
  }, "Eng"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "Hindi"
  }, "Hindi"))))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, auth_data && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_MoreHoriz.default, null), /*#__PURE__*/_react.default.createElement("div", null, "More")), /*#__PURE__*/_react.default.createElement(_Menu.default, {
    anchorEl: anchorEl,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "logout",
    onClick: handleLogout
  }, "Logout")))))))));
}
const mapStateToProps = state => {
  return {
    auth_data: state.auth.data // Assuming you have a reducer that manages a "count" property
  };
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  logout: _AuthAction.logout
})(HeaderDesktop);