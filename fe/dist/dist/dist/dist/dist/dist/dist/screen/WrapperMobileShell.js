"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WrapperMobileShell;
var _react = _interopRequireWildcard(require("react"));
var _HeaderDesktop = _interopRequireDefault(require("./HeaderDesktop"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _HeaderMobile = _interopRequireDefault(require("./HeaderMobile"));
var _BottomMobile = _interopRequireDefault(require("./BottomMobile"));
var _sky_bg = _interopRequireDefault(require("../images/sky_bg.jpg"));
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
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= 468) {
    return "desktop";
  } else {
    return "mobile";
  }
};
function WrapperMobileShell(_ref) {
  let {
    children,
    includeWrapper,
    ...otherProps
  } = _ref;
  console.log("includeWrapper:", includeWrapper, otherProps);
  const [deviceType, setDeviceType] = (0, _react.useState)(getDeviceType());
  console.log("deviceType", deviceType);
  (0, _react.useEffect)(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "rgba(173, 216, 230, 0.3)",
      textAlign: "center"
    }
  }, deviceType === "mobile" ? /*#__PURE__*/_react.default.createElement(_HeaderMobile.default, null) : /*#__PURE__*/_react.default.createElement(_HeaderDesktop.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: "1",
      overflowY: "auto",
      border: "1px solid blue"
      // ,backgroundImage: `url(${bgImg})`,
      // backgroundSize: 'cover', // or 'contain' based on your preference
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center center'
    }
  }, children), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, deviceType === "mobile" ? /*#__PURE__*/_react.default.createElement(_BottomMobile.default, null) : /*#__PURE__*/_react.default.createElement(_Footer.default, null)));
}