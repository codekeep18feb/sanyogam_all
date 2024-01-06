"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlankChatScreen;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const imageStyle = {
  backgroundImage: "url('https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg')",
  backgroundSize: '200px 200px',
  // Set the image size to 200x200
  backgroundPosition: 'center',
  // Center the image horizontally
  display: 'flex',
  alignItems: 'center',
  // Center the image vertically
  height: '600px',
  backgroundRepeat: 'no-repeat',
  // Turn off background image repeat
  border: "1px solid grey",
  width: '700px'
};
function BlankChatScreen() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: imageStyle
  });
}