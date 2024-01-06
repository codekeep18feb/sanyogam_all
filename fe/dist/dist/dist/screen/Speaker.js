"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const SpeakButton = () => {
  const speak = () => {
    const message = new SpeechSynthesisUtterance('Hello');
    window.speechSynthesis.speak(message);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: speak,
    style: {
      cursor: 'pointer',
      padding: '20px',
      border: '1px solid #ccc'
    }
  }, "Click me to speak");
};
function Speaker() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Speaker"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "React Speech Speaker"), /*#__PURE__*/_react.default.createElement(SpeakButton, null));
}
var _default = exports.default = Speaker;