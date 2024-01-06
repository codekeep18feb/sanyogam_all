"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _PaymentForm = _interopRequireDefault(require("./PaymentForm"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Pricing = () => {
  const [showOverlay, setShowOverlay] = (0, _react.useState)(false);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const containerStyle = {
    height: '100vh',
    // Set the container to full viewport height
    display: 'flex',
    // Use flexbox to split the container into two halves
    flexDirection: 'column' // Stack the two halves vertically
  };
  const topHalfStyle = {
    backgroundImage: 'url(https://images.pexels.com/photos/1111316/pexels-photo-1111316.jpeg?auto=compress&cs=tinysrgb&w=800)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: '1' // Make the top half take up 50% of the container's height
  };
  const bottomHalfStyle = {
    backgroundColor: 'white',
    flex: '1',
    // Make the bottom half take up 50% of the container's height
    position: 'relative' // Position the tile relative to this div
  };
  const tileStyle = {
    width: '200px',
    height: '300px',
    backgroundColor: 'blue',
    // Set the tile's background color (you can change this)
    position: 'absolute',
    left: '50%',
    // Position the tile horizontally in the middle
    top: '20%',
    // Position the tile vertically in the middle
    transform: 'translate(-50%, -50%)' // Center the tile both horizontally and vertically
  };
  const overlayStyle = {
    width: '300px',
    height: '200px',
    backgroundColor: "white",
    //'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    position: 'fixed',
    // Position the overlay fixed to the viewport
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // Center the overlay horizontally and vertically
    zIndex: showOverlay ? '1' : '-1',
    // Show the overlay when showOverlay is true
    display: showOverlay ? 'block' : 'none'
  };
  const proceedButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)'
  };
  const handleContinueClick = () => {
    setShowOverlay(true);
  };

  // const handleProceedClick = () => {
  //   setShowOverlay(false);

  // };

  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: topHalfStyle
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: bottomHalfStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: tileStyle
  }, /*#__PURE__*/_react.default.createElement("div", null, "Rs 499"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleContinueClick
  }, "Continue"))), showOverlay && /*#__PURE__*/_react.default.createElement("div", {
    style: overlayStyle
  }, /*#__PURE__*/_react.default.createElement(_PaymentForm.default, null)));
};
var _default = exports.default = Pricing;