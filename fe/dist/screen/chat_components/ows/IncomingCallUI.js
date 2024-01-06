"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _IncomingCallUIL = _interopRequireDefault(require("./IncomingCallUIL"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function IncomingCallUI() {
  var _location$state;
  const location = (0, _reactRouterDom.useLocation)();
  const incomingCallData = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.incomingCallData;

  // Use incomingCallData as needed
  console.log('incomingCallData', incomingCallData);
  return (
    /*#__PURE__*/
    // Your component JSX
    // <div>incoming calldata - {typeof(incomingCallData.initiator)}</div>
    _react.default.createElement(_IncomingCallUIL.default, {
      with_userid: incomingCallData.frm_id
    })
    // JSON.stringify(incomingCallData)
    // 
  );
}
var _default = exports.default = IncomingCallUI;