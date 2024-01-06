"use strict";

var _react = require("@testing-library/react");
var _App = _interopRequireDefault(require("./App"));
var _WrapperMobileShell = _interopRequireDefault(require("./screen/WrapperMobileShell"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
test('renders learn react link', () => {
  (0, _react.render)(
  /*#__PURE__*/
  // <WrapperMobileShell >
  React.createElement(_App.default, null)
  // </WrapperMobileShell >
  );
  const linkElement = _react.screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});